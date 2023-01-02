import { PhotoProps } from "./photo";

export interface AppProps {
  children: React.ReactNode;
}

export type CtxProps = {
  loading?: boolean;
  photos?: Array<PhotoProps> = [];
  page?: number;
  query?: string;
  newImages?: boolean;
  setQuery?: React.Dispatch<React.SetStateAction<string>>;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  handleSubmit?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
