// Todoist OAuth token response
export interface TodoistTokenResponse {
  access_token: string;
  token_type: 'Bearer';
}

// Todoist user API response
export interface TodoistUser {
  id: number;
  email: string;
  full_name: string;
  avatar_url?: string;
  timezone: string;
  lang: string;
  image_id?: string;
  inbox_project_id: number;
  team_inbox_id?: number;
  is_premium: boolean;
  premium_until?: string;
  karma: number;
  karma_trend: string;
  days_off: number[];
  theme: number;
  features: {
    restriction: number;
    has_push_reminders: boolean;
    beta: number;
  };
  join_date: string;
}

// Error response from Todoist API
export interface TodoistError {
  error: string;
  error_description?: string;
}