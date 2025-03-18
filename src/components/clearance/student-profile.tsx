import { Student, ClearanceRequest, BorrowRecord } from "@/lib/types";
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
  Calendar,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  BookOpen,
  AlertCircle,
} from "lucide-react";

interface StudentProfileProps {
  student: Student;
  clearanceRequest: ClearanceRequest;
  borrowRecords: BorrowRecord[];
}

export function StudentProfile({
  student,
  clearanceRequest,
  borrowRecords,
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
              {/* {student.address && (
                <div className="flex items-center text-sm">
                  <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{student.address}</span>
                </div>
              )} */}
            </div>
            {/* <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Enrolled: {student.enrollmentDate.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-sm">
                <GraduationCap className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Expected Graduation: {student.graduationYear}</span>
              </div>
              <div className="flex items-center text-sm">
                <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Faculty: {student.faculty}</span>
              </div>
            </div> */}
          </div>
        </CardContent>
      </Card>

      {/* Library Obligations Summary */}
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
                <span className="text-2xl font-bold">{activeLoans.length}</span>
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
                  UGX {clearanceRequest.totalFineAmount?.toLocaleString() ?? 0}
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
    </div>
  );
}
