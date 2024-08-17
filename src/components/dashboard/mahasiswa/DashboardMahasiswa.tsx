import { useEffect, useState } from "react";
import { ThemeProps } from "../../../types/common.types";
import { Layout, sidebarMahasiswaItems } from "../Layout";
import useAxiosInstance from "../../../configs/axios.configs";
import { useKeycloak } from "@react-keycloak/web";

interface statsInfoSetoranMahasiswaProps {
	label: string;
	jumlah_wajib_setor: number;
	jumlah_sudah_setor: number;
	jumlah_belum_setor: number;
	persentase: string;
}

const labelPersyaratan = (persyaratan: string) => {
  switch (persyaratan) {
    case "KP":
      return ["bg-success/50", "Kerja Praktek"];
    case "SEMKP":
      return ["bg-warning/50", "Seminar Kerja Praktek"];
    case "DAFTAR_TA":
      return ["bg-accent/50", "Pendaftaran Judul TA"];
    case "SEMPRO":
      return ["bg-primary/50", "Seminar Proposal"];
    case "SIDANG_TA":
      return ["bg-error/50", "Sidang Tugas Akhir"];
    default:
      return "";
  }
};

const DashboardMahasiswa = ({ setTheme, currentTheme }: ThemeProps) => {
	const axiosInstance = useAxiosInstance();
	const { keycloak } = useKeycloak();

	const [statsInfoSetoranMahasiswa, setStatsInfoSetoranMahasiswa] = useState<
		statsInfoSetoranMahasiswaProps[]
	>([]);

	useEffect(() => {
		axiosInstance
			.get(
				`/mahasiswa/setoran/info/${keycloak.tokenParsed?.email.split("@")[0]}`
			)
			.then((res) => res.data.data)
			.then((res) => {
				setStatsInfoSetoranMahasiswa(res);
			});
	}, []);

	return (
		<Layout
			setTheme={setTheme}
			currentTheme={currentTheme}
			sidebarItems={sidebarMahasiswaItems}
			subpageTitle="Dashboard Mahasiswa"
		>
      <p className="md:text-3xl text-2xl font-bold">🔥 Progress Setoran hafalan mu...</p>
      <p className="pt-2 pl-2">Berikut nih statistik progress dari setoran hafalan kamu untuk persyaratan akademik di UIN Suska Riau, semangat terus yaa ❤💛</p>
			
      <div className="flex gap-6 overflow-x-auto py-6 px-2">
				{statsInfoSetoranMahasiswa.map(
					(data: statsInfoSetoranMahasiswaProps) => (
            <div className="flex flex-col items-center gap-2 bg-base-200 hover:bg-base-300/70 hover:skew-y-3 p-8 rounded-md">
            <p className="text-lg font-bold">{labelPersyaratan(data.label)[1]} ({data.persentase})</p>
              <progress
                className="progress progress-accent w-72 h-14"
                value={data.jumlah_sudah_setor}
                max={data.jumlah_wajib_setor}
              ></progress>
              <p className="text-lg italic">({data.jumlah_sudah_setor}/{data.jumlah_wajib_setor})</p>
            </div>
					)
				)}
			</div>
		</Layout>
	);
};

export default DashboardMahasiswa;
