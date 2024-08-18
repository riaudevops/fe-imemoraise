import { useEffect, useState } from "react";
import { ThemeProps } from "../../../types/common.types";
import { Layout, sidebarPAItems } from "../Layout";
import useAxiosInstance from "../../../configs/axios.configs";
import { useLocation } from "react-router-dom";

interface dataSetoranMahasiswaProps {
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

const formatDateTime = (isoString: string) => {
	if (!isoString) return "";

	const date = new Date(isoString);
	const dateOptions = {
		day: "numeric" as const,
		month: "long" as const,
		year: "numeric" as const,
	};
	return date
		.toLocaleDateString("id-ID", dateOptions)
		.replace(/(\d+ \w+)/, "$1,");
};

interface selectedDataForModalBoxInfoProps {
	nim: string;
	nama: string;
	surah: string;
	nomor_surah: number;
}

const MahasiswaPASetoran = ({ setTheme, currentTheme }: ThemeProps) => {
	const location = useLocation();
	const [nama, setNama] = useState("");
	const [nim, setNim] = useState("");
	const [nip, setNip] = useState("");

	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		const namaParam = queryParams.get("nama");
		const nimParam = queryParams.get("nim");
		const nipParam = queryParams.get("nip");

		if (namaParam) setNama(namaParam);
		if (nimParam) setNim(nimParam);
		if (nipParam) setNip(nipParam);
	}, [location.search]);

	const axiosInstance = useAxiosInstance();

	const [dataSetoranMahasiswa, setDataSetoranMahasiswa] =
		useState<dataSetoranMahasiswaProps[]>();

	const [showModal, setShowModal] = useState(false);
	const [selectedData, setSelectedData] =
		useState<selectedDataForModalBoxInfoProps>();
    const [isChecked, setIsChecked] = useState(false);

	const handleRowClick = (data: selectedDataForModalBoxInfoProps) => {
		setSelectedData(data);
		setShowModal(true);
	};

	useEffect(() => {
		axiosInstance
			.get(`/mahasiswa/surah/${nim}`)
			.then((res) => res.data.data)
			.then((res) => {
				setDataSetoranMahasiswa(res);
			});
	}, [nim]);

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

	return (
		<Layout
			setTheme={setTheme}
			currentTheme={currentTheme}
			sidebarItems={sidebarPAItems}
			subpageTitle="Detail Setoran Mahasiswa"
		>
			<div className="flex flex-col gap-6 mt-2">
				<div className="flex justify-between h-12">
					<div className="font-semibold">
						<div className="flex">
							<span className="w-16">Nama</span>
							<span>: {nama}</span>
						</div>
						<div className="flex">
							<span className="w-16">NIM</span>
							<span>: {nim}</span>
						</div>
					</div>
					<button className="btn btn-outline btn-rounded-sm btn-primary rounded-sm w-32 text-lg font-semibold">
						🖨️ Cetak
					</button>{" "}
				</div>

				{/* Table Setoran */}
				<div className="rounded-xl overflow-auto flex-grow h-[calc(100vh-176px)]">
					<table className="table text-center table-auto text-sm">
						{/* head */}
						<thead className="bg-primary text-sm font-bold rounded-md text-base-100 sticky top-0">
							<tr>
								<th>No.</th>
								<th>Nama Surah</th>
								<th>Tanggal Setoran Hafalan</th>
								<th>Persyaratan Setoran</th>
								<th>Dosen yang Mengesahkan</th>
								<th>Aksi</th>
							</tr>
						</thead>
						<tbody>
							{dataSetoranMahasiswa?.map((data, index) => (
								<tr
									key={index}
									className="text-neutral-content odd:bg-base-200 even:bg-base-300 hover:bg-base-100 active:bg-base-300"
								>
									<th className="text-base-content">
										{data.setoran?.length ? "✔" : ""} {index + 1}.
									</th>
									<td className="font-bold text-base-content">{data.nama}</td>
									<td className="text-base-content underline italic">
										{formatDateTime(data.setoran?.[0]?.tgl_validasi || "")}
									</td>
									<td>
										<div
											className={` ${
												labelPersyaratan(data.label)[0]
											} py-2 rounded-sm`}
										>
											<p className="font-semibold text-base-content">
												{labelPersyaratan(data.label)[1]}
											</p>
										</div>
									</td>
									<td className="text-base-content underline italic">
										{data.setoran?.[0]?.dosen.nama}
									</td>
									<td>
										<button
											onClick={() =>
												handleRowClick({
													nama: nama,
													nim: nim,
													surah: data.nama,
													nomor_surah: data.nomor
												})
											}
											className={`btn ${
												data.setoran?.length && "btn-disabled"
											} btn-sm btn-base-100 rounded-sm btn-outline`}
										>
											ACC
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{showModal && (
					<div
						className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-65 flex justify-center items-center"
						style={{ zIndex: 9999 }}
					>
						<div className="flex flex-col justify-center items-center lg:ml-10 w-96 bg-base-100 p-4 rounded-md">
							<h2 className="text-xl font-bold mb-2">
								Validasi Pengesahan Anda:
							</h2>

							<div className="mt-3 w-full p-2 bg-warning/20 font-medium">
								<p className="text-lg text-center">Nama Mahasiswa</p>
							</div>
							<div className="w-full p-2 bg-base-300">
								<p className="text-lg text-center">{selectedData?.nama}</p>
							</div>
							<div className="mt-3 w-full p-2 bg-warning/20 font-medium">
								<p className="text-lg text-center">NIM</p>
							</div>
							<div className="w-full p-2 bg-base-300">
								<p className="text-lg text-center">{selectedData?.nim}</p>
							</div>
							<div className="mt-3 w-full p-2 bg-warning/20 font-medium">
								<p className="text-lg text-center">Nama Surah</p>
							</div>
							<div className="w-full p-2 bg-base-300">
								<p className="text-lg text-center">{selectedData?.surah}</p>
							</div>
							<div className="mt-3 w-full p-2 bg-warning/20 font-medium">
								<p className="text-lg text-center">Tanggal Setoran Hafalan</p>
							</div>
							<div className="w-full p-2 bg-base-300">
								<p className="text-lg text-center">17 Agustus, 2024</p>
							</div>

                            <div className="mt-6 flex justify-start gap-3">
                                <input
                                    type="checkbox"
                                    onClick={() => setIsChecked(!isChecked)}
                                    className="checkbox border-orange-400 [--chkbg:theme(colors.indigo.600)] [--chkfg:orange] checked:border-indigo-800"
                                />
                                <p>Saya yakin untuk <span className="font-bold italic">memvalidasi hafalan surat</span> mahasiswa tersebut.</p>
                            </div>

                            <div className="mt-5 w-full flex gap-3 pr-3">
                                <button className={`w-1/2 btn btn-rounded-sm btn-success ${!isChecked && 'btn-disabled'}`}
                                    onClick={() => {
                                        axiosInstance.post(
                                            `/dosen/mahasiswa`,
                                            {
                                                nim: nim,
                                                nip: nip,
                                                nomor_surah: selectedData?.nomor_surah,
                                            }
										).then(() => {
											setShowModal(false)
										})
                                    }}
                                >Validasi</button>
                                <button className="w-1/2 btn btn-rounded-sm btn-error" onClick={() => {
                                    setShowModal(false)
                                    setIsChecked(false)
                                }}>Batalkan</button>
                            </div>
						</div>
					</div>
				)}
			</div>
		</Layout>
	);
};

export default MahasiswaPASetoran;
