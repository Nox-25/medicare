import Header from "@/components/layout/Header";
import { useAuth } from "@/auth/AuthContext";
import { readAppointments, addAppointment, generateId, readUsers, upsertUser, addNotification, readDocuments, addDocument, readHistory, addHistory } from "@/lib/utils";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const PageShell = ({ title, children }: { title: string; children?: React.ReactNode }) => (
	<div className="min-h-screen bg-gradient-subtle">
		<Header />
		<main className="container mx-auto px-4 py-8">
			<h1 className="text-2xl font-bold mb-4">{title}</h1>
			{children ?? <p className="text-muted-foreground">Content coming soon.</p>}
		</main>
	</div>
);

export const AppointmentsPage = () => (
	<PageShell title="Appointments">
		<AppointmentsInner />
	</PageShell>
);

export const HistoryPage = () => (
	<PageShell title="Medical History">
		<HistoryInner />
	</PageShell>
);

export const ProfilePage = () => (
	<PageShell title="Profile">
		<ProfileInner />
	</PageShell>
);

export const DocumentsPage = () => (
	<PageShell title="Documents">
		<DocumentsInner />
	</PageShell>
);

export const ContactPage = () => (
	<PageShell title="Contact Doctor">
		<p className="text-muted-foreground">Messaging your doctor is coming soon.</p>
	</PageShell>
);

const AppointmentsInner = () => {
	const { user } = useAuth();
	const doctors = useMemo(() => readUsers().filter((u) => u.role === "doctor"), []);
	const myAppointments = useMemo(() => readAppointments().filter((a) => a.patientEmail === user?.email), [user]);
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");
	const [doctorEmail, setDoctorEmail] = useState<string>(doctors[0]?.email ?? "");

	return (
		<div className="grid lg:grid-cols-2 gap-6">
			<Card>
				<CardContent className="p-6 space-y-4">
					<div className="text-lg font-semibold">Book New Appointment</div>
					<div className="grid sm:grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="date">Date</Label>
							<Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
						</div>
						<div className="space-y-2">
							<Label htmlFor="time">Time</Label>
							<Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
						</div>
						<div className="space-y-2 sm:col-span-2">
							<Label>Doctor</Label>
							<Select value={doctorEmail} onValueChange={setDoctorEmail}>
								<SelectTrigger>
									<SelectValue placeholder="Select doctor" />
								</SelectTrigger>
								<SelectContent>
									{doctors.map((d) => (
										<SelectItem key={d.email} value={d.email}>{d.name} ({d.email})</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
					<Button
						onClick={() => {
							if (!user?.email || !date || !time || !doctorEmail) return;
							const newAppt = {
								id: generateId("appt"),
								patientEmail: user.email,
								doctorEmail,
								date,
								time,
								status: "pending" as const,
							};
							addAppointment(newAppt);
							addNotification({
								id: generateId("ntf"),
								toEmail: doctorEmail,
								createdAt: new Date().toISOString(),
								type: "appointment_request",
								message: `New appointment request from ${user.email} on ${date} at ${time}`,
								data: { appointmentId: newAppt.id, patientEmail: user.email },
								read: false,
							});
							alert("Appointment request sent to doctor.");
						}}
						className="bg-gradient-primary"
					>
						Submit Request
					</Button>
				</CardContent>
			</Card>

			<Card>
				<CardContent className="p-6 space-y-4">
					<div className="text-lg font-semibold">Your Appointments</div>
					<div className="space-y-3">
						{myAppointments.length === 0 && <p className="text-muted-foreground">No appointments yet.</p>}
						{myAppointments.map((a) => (
							<div key={a.id} className="flex items-center justify-between rounded-md border p-3">
								<div>
									<div className="font-medium">{a.date} {a.time}</div>
									<div className="text-sm text-muted-foreground">Doctor: {a.doctorEmail}</div>
								</div>
								<Badge className={a.status === "confirmed" ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-yellow-100 text-yellow-800 border-yellow-200"}>
									{a.status}
								</Badge>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

const DocumentsInner = () => {
	const { user } = useAuth();
	const docs = readDocuments().filter((d) => d.patientEmail === user?.email);
	const [file, setFile] = useState<File | null>(null);
	const [name, setName] = useState("");

	const handleUpload = async () => {
		if (!user?.email || !file || !name) return;
		const dataUrl = await new Promise<string>((resolve) => {
			const reader = new FileReader();
			reader.onload = () => resolve(reader.result as string);
			reader.readAsDataURL(file);
		});
		addDocument({ id: generateId("doc"), patientEmail: user.email, name, uploadedAt: new Date().toISOString(), dataUrl });
		location.reload();
	};

	return (
		<div className="grid lg:grid-cols-2 gap-6">
			<Card>
				<CardContent className="p-6 space-y-4">
					<div className="text-lg font-semibold">Upload Document</div>
					<div className="space-y-2">
						<Label>Name</Label>
						<Input value={name} onChange={(e) => setName(e.target.value)} />
					</div>
					<div className="space-y-2">
						<Label>File</Label>
						<Input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
					</div>
					<Button onClick={handleUpload} className="bg-gradient-primary">Upload</Button>
				</CardContent>
			</Card>

			<Card>
				<CardContent className="p-6 space-y-4">
					<div className="text-lg font-semibold">Your Documents</div>
					<div className="space-y-3">
						{docs.length === 0 && <p className="text-muted-foreground">No documents uploaded.</p>}
						{docs.map((d) => (
							<div key={d.id} className="rounded-md border p-3">
								<div className="font-medium">{d.name}</div>
								<div className="text-sm text-muted-foreground">Uploaded {new Date(d.uploadedAt).toLocaleString()}</div>
								<a className="text-primary text-sm" href={d.dataUrl} download>
									Download
								</a>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

const HistoryInner = () => {
	const { user } = useAuth();
	const items = readHistory().filter((h) => h.patientEmail === user?.email);
	const [date, setDate] = useState("");
	const [summary, setSummary] = useState("");
	const [critical, setCritical] = useState(false);

	return (
		<div className="grid lg:grid-cols-2 gap-6">
			<Card>
				<CardContent className="p-6 space-y-4">
					<div className="text-lg font-semibold">Add History Entry</div>
					<div className="space-y-2">
						<Label>Date</Label>
						<Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
					</div>
					<div className="space-y-2">
						<Label>Summary</Label>
						<Input value={summary} onChange={(e) => setSummary(e.target.value)} />
					</div>
					<div className="flex items-center gap-2">
						<input id="critical" type="checkbox" checked={critical} onChange={(e) => setCritical(e.target.checked)} />
						<label htmlFor="critical" className="text-sm">Critical</label>
					</div>
					<Button onClick={() => {
						if (!user?.email || !date || !summary) return;
						addHistory({ id: generateId("hist"), patientEmail: user.email, date, summary, critical });
						location.reload();
					}} className="bg-gradient-primary">Add</Button>
				</CardContent>
			</Card>

			<Card>
				<CardContent className="p-6 space-y-4">
					<div className="text-lg font-semibold">Medical History</div>
					<div className="space-y-3">
						{items.length === 0 && <p className="text-muted-foreground">No history yet.</p>}
						{items.map((h) => (
							<div key={h.id} className="flex items-center justify-between rounded-md border p-3">
								<div>
									<div className="font-medium">{h.date}</div>
									<div className="text-sm text-muted-foreground">{h.summary}</div>
								</div>
								<Badge className={h.critical ? "bg-red-100 text-red-700 border-red-200" : "bg-emerald-100 text-emerald-700 border-emerald-200"}>
									{h.critical ? "Critical" : "Normal"}
								</Badge>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
const ProfileInner = () => {
	const { user } = useAuth();
	const users = readUsers();
	const me = users.find((u) => u.email?.toLowerCase() === user?.email?.toLowerCase()) || {};
	const [name, setName] = useState(me.name || "");
	const [phone, setPhone] = useState(me.phone || "");
	const [bloodGroup, setBloodGroup] = useState(me.bloodGroup || "");
	const [gender, setGender] = useState(me.gender || "");
	const [dateOfBirth, setDob] = useState(me.dateOfBirth || "");
	const [emergencyName, setEmergencyName] = useState(me.emergencyName || "");
	const [emergencyPhone, setEmergencyPhone] = useState(me.emergencyPhone || "");

	return (
		<Card>
			<CardContent className="p-6 space-y-4">
				<div className="grid md:grid-cols-2 gap-4">
					<div className="space-y-2">
						<Label>Name</Label>
						<Input value={name} onChange={(e) => setName(e.target.value)} />
					</div>
					<div className="space-y-2">
						<Label>Phone</Label>
						<Input value={phone} onChange={(e) => setPhone(e.target.value)} />
					</div>
					<div className="space-y-2">
						<Label>Blood Group</Label>
						<Input value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} />
					</div>
					<div className="space-y-2">
						<Label>Gender</Label>
						<Input value={gender} onChange={(e) => setGender(e.target.value)} />
					</div>
					<div className="space-y-2">
						<Label>Date of Birth</Label>
						<Input type="date" value={dateOfBirth} onChange={(e) => setDob(e.target.value)} />
					</div>
					<div className="space-y-2">
						<Label>Emergency Contact Name</Label>
						<Input value={emergencyName} onChange={(e) => setEmergencyName(e.target.value)} />
					</div>
					<div className="space-y-2">
						<Label>Emergency Contact Phone</Label>
						<Input value={emergencyPhone} onChange={(e) => setEmergencyPhone(e.target.value)} />
					</div>
				</div>
				<Button
					onClick={() => {
						if (!user?.email) return;
						upsertUser({
							email: user.email,
							name,
							phone,
							bloodGroup,
							gender,
							dateOfBirth,
							emergencyName,
							emergencyPhone,
						});
						alert("Profile updated.");
					}}
					className="bg-gradient-primary"
				>
					Save Changes
				</Button>
			</CardContent>
		</Card>
	);
};
