type ApplyFellowShipType = {
  email: string;
  reason: string;
};

type JobApplicationStep1 = {
  email: string;
  phonenumber: string;
};

type JobApplicationStep2 = {
  resume: File | null;
  cover_letter: File | null;
  projects: number[];
  portfolios: number[];
};
