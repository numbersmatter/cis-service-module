export interface DriveThruFormDbModel {
  staff_id: string;
  staff_name: string;
  created_date: Date;
  updated_date: Date;
  form_responses: {
    language: string;
    household_adults: number;
    household_children: number;
    primary_children: number;
    elementary_children: number;
    middle_children: number;
    high_children: number;
    notes: string;
  };
}

export interface DriveThruForm extends DriveThruFormDbModel {
  id: string;
}
