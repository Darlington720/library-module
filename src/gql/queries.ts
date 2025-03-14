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

export { GET_MY_PROFILE };
