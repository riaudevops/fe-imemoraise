import useAxiosInstance from "../../../configs/axios.configs";
import { useKeycloak } from "@react-keycloak/web";
import { useEffect, useState } from "react";
import {
  dataSetoranMahasiswaProps,
  selectedDataForModalBoxInfoProps,
} from "../../../interfaces/common.interfaces";
import { formatDateTime, labelPersyaratan } from "../Constant";

const SetoranMahasiswa = () => {
  const axiosInstance = useAxiosInstance();
  const { keycloak } = useKeycloak();
  const [nama, setNama] = useState<string>();
  const [nim, setNim] = useState<string>();
  const [showModal, setShowModal] = useState(false);

  const [dataSetoranMahasiswa, setDataSetoranMahasiswa] =
    useState<dataSetoranMahasiswaProps[]>();

  const [selectedData, setSelectedData] =
    useState<selectedDataForModalBoxInfoProps>();

  const handleRowClick = (data: selectedDataForModalBoxInfoProps) => {
    setSelectedData(data);
    setShowModal(true);
  };

  useEffect(() => {
    // Mengambil data nama, dan nim mahasiswa berdasarkan email
    axiosInstance
      .get(`/mahasiswa/info/${keycloak.tokenParsed?.email}`)
      .then((res) => res.data.data)
      .then((res) => {

        setNama(res.nama);
        setNim(res.nim);
        
        // Mengambil data setoran mahasiswa berdasarkan nim
        axiosInstance
          .get(`/mahasiswa/setoran/${res.nim}`)
          .then((res) => res.data.data)
          .then((res) => {
            setDataSetoranMahasiswa(res);
          });
      });

  }, [axiosInstance, keycloak.tokenParsed?.email]);

  return (
    <div className="flex flex-col gap-6 mt-2">
      <div className="flex justify-between h-12">
        <div className="font-semibold">
          <div className="flex text-sm lg:text-base">
            <span className="w-16">Nama</span>
            <span>: {nama}</span>
          </div>
          <div className="flex text-sm lg:text-base">
            <span className="w-16">NIM</span>
            <span>: {nim}</span>
          </div>
        </div>
        <button className="text-lg font-semibold rounded-sm lg:w-28 btn btn-outline btn-rounded-sm btn-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="h-5"
          >
            <path d="M6 9V2h12v7" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect x="6" y="14" width="12" height="8" />
            <line x1="8" y1="17" x2="16" y2="17" />
            <line x1="8" y1="20" x2="16" y2="20" />
          </svg>
          <span className="hidden lg:inline">Cetak</span>
        </button>
      </div>

      {/* Table Setoran */}
      <div className="rounded-xl overflow-auto flex-grow h-[calc(100vh-176px)]">
        <table className="table text-sm text-center table-auto">
          <thead className="sticky top-0 text-sm font-bold rounded-md bg-primary text-base-100">
            <tr>
              <th>No.</th>
              <th>Nama Surah</th>
              <th>Tanggal Setoran Hafalan</th>
              <th>Persyaratan Setoran</th>
              <th>Dosen yang Mengesahkan</th>
            </tr>
          </thead>
          <tbody>
            {dataSetoranMahasiswa?.map((data, index) => (
              <tr
                onClick={() =>
                  handleRowClick({
                    surah: data.nama,
                    tgl_setoran: formatDateTime(
                      data.setoran?.[0]?.tgl_setoran || ""
                    ),
                    dosen: data.setoran?.[0]?.dosen?.nama || "",
                  })
                }
                key={index}
                className="text-neutral-content odd:bg-base-200 even:bg-base-300 hover:bg-base-100 hover:cursor-pointer active:bg-base-300"
              >
                <th className="text-base-content">
                  {data.setoran?.length ? "✔" : ""} {index + 1}.
                </th>
                <td className="font-bold text-base-content">{data.nama}</td>
                <td className="italic underline text-base-content">
                  {formatDateTime(data.setoran?.[0]?.tgl_setoran || "")}
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
                <td className="italic underline text-base-content">
                  {data.setoran?.[0]?.dosen.nama}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-65"
          style={{ zIndex: 9999 }}
        >
          <div className="flex flex-col items-center justify-center p-4 rounded-md lg:ml-10 w-96 bg-base-100">
            <h2 className="mb-2 text-xl font-bold">
              Detail Riwayat Penyetoran Anda:
            </h2>

            <div className="w-full p-2 mt-3 font-medium bg-warning/20">
              <p className="text-lg text-center">Nama Surah</p>
            </div>
            <div className="w-full p-2 bg-base-300">
              <p className="text-lg text-center">{selectedData?.surah}</p>
            </div>

            {selectedData?.tgl_setoran ? (
              <>
                <div className="w-full p-2 mt-4 font-medium bg-warning/20">
                  <p className="text-lg text-center">Tanggal Setoran Hafalan</p>
                </div>
                <div className="w-full p-2 bg-base-300">
                  <p className="text-lg text-center">
                    {selectedData?.tgl_setoran}
                  </p>
                </div>
                <div className="w-full p-2 mt-4 font-medium bg-warning/20">
                  <p className="text-lg text-center">Dosen yang Mengesahkan</p>
                </div>
                <div className="w-full p-2 bg-base-300">
                  <p className="text-lg text-center">{selectedData?.dosen}</p>
                </div>
                <p className="mt-4 text-base">
                  ✅ Anda{" "}
                  <span className="italic font-semibold underline">
                    telah menyetorkan
                  </span>{" "}
                  surah tersebut.
                </p>
              </>
            ) : (
              <p className="mt-4 text-base">
                ❌ Anda{" "}
                <span className="italic font-semibold underline">
                  belum menyetorkan
                </span>{" "}
                surah tersebut.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SetoranMahasiswa;
