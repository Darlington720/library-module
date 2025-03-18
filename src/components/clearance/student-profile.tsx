import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  GraduationCap,
  Mail,
  Phone,
  BookOpen,
  AlertCircle,
  History,
  XCircle,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Type definitions
interface Student {
  student_no: string;
  name?: string;
  status: string;
  phoneNumber?: string;
  student_details: {
    biodata: {
      surname: string;
      other_names: string;
      email: string;
      phone_no?: string;
    };
    course_details: {
      course: {
        course_title: string;
      };
    };
  };
}

interface ClearanceRequest {
  status: "pending" | "cleared" | "rejected" | "disqualified";
  totalFineAmount?: number;
  overrideReason?: string;
  overrideBy?: string;
  overrideAt?: Date;
}

interface BorrowRecord {
  status: "active" | "returned" | "overdue";
  condition: "good" | "damaged" | "lost";
}

interface Rejection {
  reason: string;
  rejectedBy: string;
  rejectedAt: string | Date;
  department: string;
}

interface StudentProfileProps {
  student: Student;
  clearanceRequest: ClearanceRequest;
  borrowRecords: BorrowRecord[];
  rejectionHistory?: Rejection[];
}

export function StudentProfile({
  student,
  clearanceRequest,
  borrowRecords,
  rejectionHistory = [],
}: StudentProfileProps) {
  const getStatusColor = (status: ClearanceRequest["status"]) => {
    switch (status) {
      case "cleared":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "disqualified":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const activeLoans = borrowRecords.filter(
    (record) => record.status === "active" || record.status === "overdue"
  );
  const overdueBooks = borrowRecords.filter(
    (record) => record.status === "overdue"
  );
  const damagedOrLost = borrowRecords.filter(
    (record) => record.condition === "damaged" || record.condition === "lost"
  );

  const hasRejectionHistory = rejectionHistory && rejectionHistory.length > 0;

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader className="flex flex-row items-center space-x-4 pb-2">
          <Avatar className="h-20 w-20">
            <AvatarImage
              src={`https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=${student?.student_no}`}
              alt={student?.name}
            />
            <AvatarFallback>{`${student?.student_details?.biodata.surname} ${student?.student_details?.biodata.other_names}`}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{`${student?.student_details?.biodata.surname} ${student?.student_details?.biodata.other_names}`}</CardTitle>
                <CardDescription>{student?.student_no}</CardDescription>
              </div>
              <Badge className={getStatusColor(student.status)}>
                {student.status.charAt(0).toUpperCase() +
                  student.status.slice(1)}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <GraduationCap className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="font-medium">
                  {student?.student_details.course_details.course.course_title}
                </span>
              </div>
              <div className="flex items-center text-sm">
                <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{student?.student_details.biodata.email}</span>
              </div>
              {student.phoneNumber && (
                <div className="flex items-center text-sm">
                  <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{student?.student_details?.biodata?.phone_no}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Library Obligations and Rejection History */}
      <Tabs defaultValue="obligations" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="obligations">Library Obligations</TabsTrigger>
          <TabsTrigger value="rejections" className="relative">
            Rejection History
            {hasRejectionHistory && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {rejectionHistory.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Library Obligations Tab */}
        <TabsContent value="obligations">
          <Card>
            <CardHeader>
              <CardTitle>Library Obligations</CardTitle>
              <CardDescription>
                Current status of library-related requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium text-muted-foreground">
                    Active Loans
                  </div>
                  <div className="mt-2 flex items-center">
                    <BookOpen className="mr-2 h-5 w-5 text-blue-600" />
                    <span className="text-2xl font-bold">
                      {activeLoans.length}
                    </span>
                  </div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium text-muted-foreground">
                    Overdue Books
                  </div>
                  <div className="mt-2 flex items-center">
                    <AlertCircle className="mr-2 h-5 w-5 text-red-600" />
                    <span className="text-2xl font-bold">
                      {overdueBooks.length}
                    </span>
                  </div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium text-muted-foreground">
                    Damaged/Lost
                  </div>
                  <div className="mt-2 flex items-center">
                    <AlertCircle className="mr-2 h-5 w-5 text-orange-600" />
                    <span className="text-2xl font-bold">
                      {damagedOrLost.length}
                    </span>
                  </div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium text-muted-foreground">
                    Total Fines
                  </div>
                  <div className="mt-2 flex items-center">
                    <span className="text-2xl font-bold">
                      UGX{" "}
                      {clearanceRequest.totalFineAmount?.toLocaleString() ?? 0}
                    </span>
                  </div>
                </div>
              </div>

              {clearanceRequest.overrideReason && (
                <div className="mt-4 rounded-lg bg-yellow-50 p-4">
                  <div className="flex items-center">
                    <AlertCircle className="mr-2 h-5 w-5 text-yellow-600" />
                    <span className="font-medium text-yellow-800">
                      Manual Override Applied
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-yellow-700">
                    Reason: {clearanceRequest.overrideReason}
                  </p>
                  <p className="text-sm text-yellow-600">
                    Approved by {clearanceRequest.overrideBy} on{" "}
                    {clearanceRequest.overrideAt?.toLocaleDateString()}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rejection History Tab */}
        <TabsContent value="rejections">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <XCircle className="mr-2 h-5 w-5 text-red-600" />
                Rejection History
              </CardTitle>
              <CardDescription>
                Previous clearance request rejections
              </CardDescription>
            </CardHeader>
            <CardContent>
              {hasRejectionHistory ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Rejected By</TableHead>
                      <TableHead>Department</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rejectionHistory.map((rejection, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {new Date(rejection.rejectedAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{rejection.reason}</TableCell>
                        <TableCell>{rejection.rejectedBy}</TableCell>
                        <TableCell>{rejection.department}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <History className="h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">
                    No rejection history
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    This student has no previous clearance request rejections.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
