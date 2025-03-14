import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ClearanceTable } from './clearance-table';
import { ClearanceStats } from './clearance-stats';
import { StudentProfile } from './student-profile';
import { LibraryObligations } from './library-obligations';
import { ClearanceActions } from './clearance-actions';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Student, ClearanceRequest, BorrowRecord, Book } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';

// Mock data
const mockStudent: Student = {
  id: '1',
  registrationNumber: 'NKU/2020/1234',
  name: 'John Doe',
  email: 'john.doe@student.nkumba.edu',
  faculty: 'Computing and Technology',
  course: 'Bachelor of Science in Software Engineering',
  graduationYear: 2024,
  enrollmentDate: new Date('2020-09-01'),
  academicStatus: 'active',
  phoneNumber: '+256 701 234 567',
  address: 'Entebbe Road, Kampala',
};

const mockClearanceRequest: ClearanceRequest = {
  id: '1',
  studentId: '1',
  status: 'pending',
  submittedAt: new Date('2024-03-20'),
  hasPendingBooks: true,
  hasUnpaidFines: true,
  totalFineAmount: 25000,
  borrowedBooks: 3,
  overdueBooks: 1,
  damagedBooks: 0,
  lostBooks: 0,
};

const mockBorrowRecords: (BorrowRecord & { book: Book })[] = [
  {
    id: '1',
    bookId: '1',
    studentId: '1',
    borrowDate: new Date('2024-02-01'),
    dueDate: new Date('2024-02-15'),
    status: 'overdue',
    fine: 15000,
    book: {
      id: '1',
      title: 'Clean Code',
      author: 'Robert C. Martin',
      isbn: '9780132350884',
      category: 'Technology',
      status: 'borrowed',
      location: 'Section B-04',
      addedAt: new Date('2024-01-15'),
    },
  },
  {
    id: '2',
    bookId: '2',
    studentId: '1',
    borrowDate: new Date('2024-03-01'),
    dueDate: new Date('2024-03-15'),
    status: 'active',
    book: {
      id: '2',
      title: 'Design Patterns',
      author: 'Erich Gamma',
      isbn: '9780201633610',
      category: 'Technology',
      status: 'borrowed',
      location: 'Section B-05',
      addedAt: new Date('2024-01-15'),
    },
  },
];

export function ClearancePage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedClearance, setSelectedClearance] = useState<ClearanceRequest | null>(null);

  const handleStudentSelect = (student: Student, clearance: ClearanceRequest) => {
    setSelectedStudent(student);
    setSelectedClearance(clearance);
  };

  const handleStatusUpdate = (status: ClearanceRequest['status'], reason?: string) => {
    if (selectedClearance) {
      // Update clearance status logic here
      toast({
        title: 'Status Updated',
        description: `Clearance status updated to ${status}`,
      });
    }
  };

  const handleOverride = (reason: string) => {
    if (selectedClearance) {
      // Apply override logic here
      toast({
        title: 'Override Applied',
        description: 'Manual override has been applied successfully',
      });
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Graduation Clearance</h1>
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by registration number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button>Export Report</Button>
        </div>
      </div>

      <ClearanceStats />
      <ClearanceTable
        searchQuery={searchQuery}
        onStudentSelect={handleStudentSelect}
      />

      {/* Student Profile Dialog */}
      <Dialog
        open={!!selectedStudent && !!selectedClearance}
        onOpenChange={() => {
          setSelectedStudent(null);
          setSelectedClearance(null);
        }}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Student Clearance Details</DialogTitle>
          </DialogHeader>
          {selectedStudent && selectedClearance && (
            <ScrollArea className="max-h-[80vh]">
              <div className="space-y-6 pr-4">
                <StudentProfile
                  student={selectedStudent}
                  clearanceRequest={selectedClearance}
                  borrowRecords={mockBorrowRecords}
                />
                <LibraryObligations borrowRecords={mockBorrowRecords} />
                <ClearanceActions
                  clearanceRequest={selectedClearance}
                  onStatusUpdate={handleStatusUpdate}
                  onOverride={handleOverride}
                />
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}