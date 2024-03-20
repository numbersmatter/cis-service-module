export interface DriveThruForm {
  form_id: string;
  staff_id: string;
  staff_name: string;
  created_date: Date;
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