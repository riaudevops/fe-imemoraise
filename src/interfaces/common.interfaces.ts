import { ReactNode } from "react";
import { ThemeProps } from "../types/common.types";

export interface ProtectedRouteProps {
  children: React.ReactNode;
  roles: string[];
}

export interface NavbarProps extends ThemeProps {
  isLogin: boolean;
  onLoginClick: () => void;
  onGoToDashboardClick: () => void;
}

export interface HeroProps {
  isLogin: boolean;
  onGoToDashboardClick: () => void;
  onLoginClick: () => void;
}

export interface LayoutProps extends ThemeProps {
  children: ReactNode;
  sidebarItems: Array<{
    icon: ReactNode;
    label: string;
    link: string;
  }>;
  subpageTitle?: string;
}

export interface statsInfoSetoranMahasiswaProps {
  label: string;
  jumlah_wajib_setor: number;
  jumlah_sudah_setor: number;
  jumlah_belum_setor: number;
  persentase: string;
}

export interface dataSetoranMahasiswaProps {
  nama: string;
  label: string;
  setoran?: [
    {
      tgl_validasi: string;
      dosen: {
        nama: string;
      };
    }
  ];
}

export interface selectedDataForModalBoxInfoProps {
  surah: string;
  tgl_validasi: string;
  dosen: string;
}

export interface dataDosenProps {
  nip: string;
  nama: string;
}

export interface dataInfoMahasiswaPerAngkatanProps {
  tahun: string;
  jumlah: number;
}

export interface dataListMahasiswaPerAngkatanProps {
  nim: string;
  nama: string;
}

export interface dataSetoranMahasiswaPAProps {
  nomor: number;
  nama: string;
  label: string;
  setoran?: [
    {
      tgl_validasi: string;
      dosen: {
        nama: string;
      };
    }
  ];
}

export interface selectedDataForModalBoxInfoPAProps {
  nim: string;
  nama: string;
  surah: string;
  nomor_surah: number;
}
