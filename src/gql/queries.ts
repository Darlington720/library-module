import { gql } from "@apollo/client";

const GET_MY_PROFILE = gql`
  query my_profile {
    my_profile {
      id
      user_id
      email
      has_set_sec_qns
      sys_gen_pwd
      biodata {
        id
        email
        salutation
        surname
        other_names
        telno
      }
      last_logged_in {
        id
        machine_ipaddress
        logged_in
      }
      role {
        id: role_id
        role_name
        # permissions
        _modules {
          id
          title
          route
          logo
        }
      }
    }
  }
`;

const LOAD_LIBRARY_CLEARANCE_STUDENTS = gql`
  query library_clearance_students {
    library_clearance_students {
      id
      student_no
      status
      acc_yr_title
      section_id
      created_on
      student_details {
        biodata {
          surname
          other_names
          email
          phone_no
        }
        registration_no
        student_no
        course_details {
          course {
            course_code
            course_title
          }
        }
      }
    }
  }
`;

export { GET_MY_PROFILE, LOAD_LIBRARY_CLEARANCE_STUDENTS };
