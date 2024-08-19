import { useLocation } from "react-router-dom";
import useAxiosInstance from "../../../configs/axios.configs";
import { useEffect, useState } from "react";
import {
  dataSetoranMahasiswaPAProps,
  selectedDataForModalBoxInfoPAProps,
} from "../../../interfaces/common.interfaces";
import { formatDateTime, labelPersyaratan } from "../Constant";

const MahasiswaPASetoran = () => {
  const location = useLocation();
  const axiosInstance = useAxiosInstance();
  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [nip, setNip] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const [dataSetoranMahasiswa, setDataSetoranMahasiswa] =
    useState<dataSetoranMahasiswaPAProps[]>();

  const [selectedData, setSelectedData] =
    useState<selectedDataForModalBoxInfoPAProps>();

  const handleRowClick = (data: selectedDataForModalBoxInfoPAProps) => {
    setSelectedData(data);
    setShowModal(true);
  };

  const fetchDataSetoranMahasiswa = () => {
    axiosInstance
      .get(`/mahasiswa/surah/${nim}`)
      .then((res) => res.data.data)
      .then((res) => {
        setDataSetoranMahasiswa(res);
      });
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const namaParam = queryParams.get("nama");
    const nimParam = queryParams.get("nim");
    const nipParam = queryParams.get("nip");

    if (namaParam) setNama(namaParam);
    if (nimParam) setNim(nimParam);
    if (nipParam) setNip(nipParam);
  }, [location.search]);

  useEffect(() => {
    fetchDataSetoranMahasiswa();
  }, [axiosInstance, nim]);

  useEffect(() => {
    if (alertInfo) {
      const timer = setTimeout(() => {
        setAlertInfo(null);
      }, 5000); // Alert will disappear after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [alertInfo]);

  const handleValidation = () => {
    setIsLoading(true);
    axiosInstance
      .post(`/dosen/mahasiswa`, {
        nim: nim,
        nip: nip,
        nomor_surah: selectedData?.nomor_surah,
      })
      .then(() => {
        setShowModal(false);
        setIsChecked(false);
        setAlertInfo({ type: "success", message: "Validasi berhasil !" });
        fetchDataSetoranMahasiswa();
      })
      .catch((error) => {
        setAlertInfo({
          type: "error",
          message: "Validasi gagal: " + error.message,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="flex flex-col gap-6 mt-2">
      {alertInfo && (
        <div className="z-20 toast toast-end">
          <div
            className={`alert ${
              alertInfo.type === "success" ? "alert-success" : "alert-error"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 stroke-current shrink-0"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{alertInfo.message}</span>
          </div>
        </div>
      )}

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
        <button className="text-lg font-semibold rounded-sm w-28 btn btn-outline btn-rounded-sm btn-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5"
          >
            <path d="M6 9V2h12v7" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect x="6" y="14" width="12" height="8" />
            <line x1="8" y1="17" x2="16" y2="17" />
            <line x1="8" y1="20" x2="16" y2="20" />
          </svg>
          Cetak
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
                <td className="italic underline text-base-content">
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
                <td className="italic underline text-base-content">
                  {data.setoran?.[0]?.dosen.nama}
                </td>
                <td>
                  <button
                    onClick={() =>
                      handleRowClick({
                        nama: nama,
                        nim: nim,
                        surah: data.nama,
                        nomor_surah: data.nomor,
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
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="mb-6 text-xl font-bold text-center">
              Validasi Pengesahan Anda:
            </h2>

            <div className="w-full p-2 mt-3 font-medium bg-warning/20">
              <p className="text-lg text-center">Nama Mahasiswa</p>
            </div>
            <div className="w-full p-2 bg-base-300">
              <p className="text-lg text-center">{selectedData?.nama}</p>
            </div>
            <div className="w-full p-2 mt-3 font-medium bg-warning/20">
              <p className="text-lg text-center">NIM</p>
            </div>
            <div className="w-full p-2 bg-base-300">
              <p className="text-lg text-center">{selectedData?.nim}</p>
            </div>
            <div className="w-full p-2 mt-3 font-medium bg-warning/20">
              <p className="text-lg text-center">Nama Surah</p>
            </div>
            <div className="w-full p-2 bg-base-300">
              <p className="text-lg text-center">{selectedData?.surah}</p>
            </div>
            <div className="w-full p-2 mt-3 font-medium bg-warning/20">
              <p className="text-lg text-center">Tanggal Setoran Hafalan</p>
            </div>
            <div className="w-full p-2 bg-base-300">
              <p className="text-lg text-center">17 Agustus, 2024</p>
            </div>

            <div className="flex justify-start gap-3 mt-6">
              <input
                type="checkbox"
                onChange={() => setIsChecked(!isChecked)}
                className="checkbox border-orange-400 [--chkbg:theme(colors.indigo.600)] [--chkfg:orange] checked:border-indigo-800"
              />
              <p>
                Saya yakin untuk{" "}
                <span className="italic font-bold">
                  memvalidasi hafalan surat
                </span>{" "}
                mahasiswa tersebut.
              </p>
            </div>

            <div className="modal-action">
              <button
                className={`w-1/2 btn btn-rounded-sm btn-success ${
                  (!isChecked || isLoading) && "btn-disabled"
                }`}
                onClick={handleValidation}
              >
                {isLoading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Validasi"
                )}
              </button>
              <button
                className="w-1/2 btn btn-rounded-sm btn-error"
                onClick={() => {
                  setShowModal(false);
                  setIsChecked(false);
                }}
                disabled={isLoading}
              >
                Batalkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MahasiswaPASetoran;
