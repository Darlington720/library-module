import { useState } from "react";
import { Student, ClearanceRequest } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle, XCircle } from "lucide-react";
import convertTimestampToDate from "@/utils/convertTimestampToDate";

interface ClearanceTableProps {
  searchQuery: string;
  onStudentSelect: (student: Student, clearance: ClearanceRequest) => void;
  students: any;
}

// Mock data for demonstration
const mockData: (Student & { clearance: ClearanceRequest })[] = [
  {
    id: "1",
    registrationNumber: "NKU/2020/1234",
    name: "John Doe",
    email: "john.doe@student.nkumba.edu",
    faculty: "Computing and Technology",
    course: "Bachelor of Science in Software Engineering",
    graduationYear: 2024,
    enrollmentDate: new Date("2020-09-01"),
    academicStatus: "active",
    phoneNumber: "+256 701 234 567",
    address: "Entebbe Road, Kampala",
    clearance: {
      id: "1",
      studentId: "1",
      status: "pending",
      submittedAt: new Date("2024-03-20"),
      hasPendingBooks: true,
      hasUnpaidFines: true,
      totalFineAmount: 25000,
      borrowedBooks: 3,
      overdueBooks: 1,
      damagedBooks: 0,
      lostBooks: 0,
    },
  },
  {
    id: "2",
    registrationNumber: "NKU/2020/5678",
    name: "Jane Smith",
    email: "jane.smith@student.nkumba.edu",
    faculty: "Business Administration",
    course: "Bachelor of Business Administration",
    graduationYear: 2024,
    enrollmentDate: new Date("2020-09-01"),
    academicStatus: "active",
    phoneNumber: "+256 702 345 678",
    address: "Kampala Road",
    clearance: {
      id: "2",
      studentId: "2",
      status: "approved",
      submittedAt: new Date("2024-03-15"),
      hasPendingBooks: false,
      hasUnpaidFines: false,
      totalFineAmount: 0,
      borrowedBooks: 0,
      overdueBooks: 0,
      damagedBooks: 0,
      lostBooks: 0,
    },
  },
  {
    id: "3",
    registrationNumber: "NKU/2020/9012",
    name: "Robert Johnson",
    email: "robert.johnson@student.nkumba.edu",
    faculty: "Computing and Technology",
    course: "Bachelor of Information Technology",
    graduationYear: 2024,
    enrollmentDate: new Date("2020-09-01"),
    academicStatus: "active",
    phoneNumber: "+256 703 456 789",
    address: "Jinja Road",
    clearance: {
      id: "3",
      studentId: "3",
      status: "rejected",
      submittedAt: new Date("2024-03-18"),
      hasPendingBooks: true,
      hasUnpaidFines: true,
      totalFineAmount: 50000,
      borrowedBooks: 5,
      overdueBooks: 2,
      damagedBooks: 1,
      lostBooks: 0,
      rejectionReason: "Multiple overdue books and unpaid fines",
    },
  },
];

export function ClearanceTable({
  searchQuery,
  onStudentSelect,
  students,
}: ClearanceTableProps) {
  // console.log("students", students);
  const getStatusIcon = (status: ClearanceRequest["status"]) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "disqualified":
        return <AlertCircle className="h-4 w-4 text-orange-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusBadge = (status: ClearanceRequest["status"]) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      case "disqualified":
        return (
          <Badge className="bg-orange-100 text-orange-800">Disqualified</Badge>
        );
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  const filteredData = mockData.filter(
    (item) =>
      item.registrationNumber
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student No.</TableHead>
            <TableHead>Student Name</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Submitted Date</TableHead>
            <TableHead>Status</TableHead>
            {/* <TableHead>Issues</TableHead> */}
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((item: any) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.student_no}</TableCell>
              <TableCell>
                <div>
                  <div>{`${item.student_details.biodata.surname} ${item.student_details.biodata.other_names}`}</div>
                  <div className="text-sm text-muted-foreground">
                    {item.student_details.biodata.email}
                  </div>
                </div>
              </TableCell>
              <TableCell className="max-w-[200px] truncate">
                {item.student_details.course_details.course.course_code}
              </TableCell>
              <TableCell>
                {convertTimestampToDate(parseInt(item.created_on))}
              </TableCell>

              {/* <TableCell>
                <div className="flex items-center gap-2">
                  {getStatusIcon(item.clearance.status)}
                  {getStatusBadge(item.clearance.status)}
                </div>
              </TableCell> */}
              <TableCell>
                <div className="space-y-1">
                  {/* {item.clearance.hasPendingBooks && ( */}
                  <Badge variant="outline" className="text-yellow-600">
                    {item.status}
                  </Badge>
                  {/* )} */}
                  {/* {item.clearance.hasUnpaidFines && (
                    <Badge variant="outline" className="text-red-600">
                      Unpaid Fines
                    </Badge>
                  )}
                  {item.clearance.damagedBooks > 0 && (
                    <Badge variant="outline" className="text-orange-600">
                      Damaged Books
                    </Badge>
                  )} */}
                </div>
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onStudentSelect(item)}
                >
                  Review
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
