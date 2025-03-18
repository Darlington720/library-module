import { gql } from "@apollo/client";

const CLEAR_STUDENT_FOR_GRADUATION = gql`
  mutation clearStudentForGraduation($payload: ClearancePayload) {
    clearStudentForGraduation(payload: $payload) {
      message
      success
    }
  }
`;
export { CLEAR_STUDENT_FOR_GRADUATION };
