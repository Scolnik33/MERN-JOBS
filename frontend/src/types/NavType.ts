export type NavType = {
  name: string;
  link: string;
  index?: number;
  version?: string;
  handleActive?: () => void;
};
