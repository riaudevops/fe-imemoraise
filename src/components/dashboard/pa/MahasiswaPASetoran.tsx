import { useLocation } from "react-router-dom";
import useAxiosInstance from "../../../configs/axios.configs";
import { useEffect, useState } from "react";
import {
  dataSetoranMahasiswaPAProps,
  selectedDataForModalBoxInfoPAProps,
  statsInfoSetoranMahasiswaProps,
} from "../../../interfaces/common.interfaces";
import { formatDateTime, labelPersyaratan } from "../Constant";
import DOMPurify from "dompurify";

const MahasiswaPASetoran = () => {
  const location = useLocation();
  const axiosInstance = useAxiosInstance();
  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [nip, setNip] = useState("");
  const [showModalACC, setshowModalACC] = useState(false);
  const [showModalCancel, setshowModalCancel] = useState(false);
  const [showModalStats, setShowModalStats] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [setoranDate, setSetoranDate] = useState<Date>(new Date());

  const [alertInfo, setAlertInfo] = useState<{
    type: "success" | "error";
    message: string;
  } | null>();

  const [dataSetoranMahasiswa, setDataSetoranMahasiswa] =
    useState<dataSetoranMahasiswaPAProps[]>();

  const [statsInfoSetoranMahasiswa, setStatsInfoSetoranMahasiswa] = useState<
    statsInfoSetoranMahasiswaProps[]
  >([]);

  const [selectedData, setSelectedData] =
    useState<selectedDataForModalBoxInfoPAProps>();

  const handleACCRowClick = (data: selectedDataForModalBoxInfoPAProps) => {
    setSelectedData(data);
    setshowModalACC(true);
  };

  const handleCancelRowClick = (data: selectedDataForModalBoxInfoPAProps) => {
    setSelectedData(data);
    setshowModalCancel(true);
  };

  const fetchDataSetoranMahasiswa = () => {
    axiosInstance
      .get(`/mahasiswa/setoran/${nim}`)
      .then((res) => res.data.data)
      .then((res) => {
        setDataSetoranMahasiswa(res);

        axiosInstance
          .get(`/mahasiswa/setoran/info/${nim}`)
          .then((res) => res.data.data)
          .then((res) => {
            setStatsInfoSetoranMahasiswa(res);
          });
      });
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const namaParam = DOMPurify.sanitize(queryParams.get("nama") || "");
    const nimParam = DOMPurify.sanitize(queryParams.get("nim") || "");
    const nipParam = DOMPurify.sanitize(queryParams.get("nip") || "");

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

  const handleValidationSetoran = () => {
    setIsLoading(true);
    axiosInstance
      .post(`/dosen/mahasiswa/setoran`, {
        nim: nim,
        nip: nip,
        nomor_surah: selectedData?.nomor_surah,
        tgl_setoran: setoranDate,
      })
      .then((res) => res.data)
      .then((res) => {
        setshowModalACC(false);
        setIsChecked(false);
        setSetoranDate(new Date());
        setAlertInfo({ type: "success", message: res.message });
        fetchDataSetoranMahasiswa();
      })
      .catch((error) => {
        setAlertInfo({
          type: "error",
          message: "Validasi gagal: " + error.response.data.message,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCancelSetoran = () => {
    setIsLoading(true);
    axiosInstance
      .delete(`/dosen/mahasiswa/setoran/${selectedData?.id_setoran}`)
      .then((res) => res.data)
      .then((res) => {
        setshowModalCancel(false);
        setIsChecked(false);
        setAlertInfo({ type: "success", message: res.message });
        fetchDataSetoranMahasiswa();
      })
      .catch((error) => {
        setAlertInfo({
          type: "error",
          message: "Validasi gagal: " + error.response.data.message,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="flex flex-col gap-6 mt-2">
      {alertInfo && (
        <div className="top-5 toast toast-top" style={{ zIndex: 9999 }}>
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
            <span className="-ml-2 font-semibold">{alertInfo.message}</span>
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
        <button
          onClick={() => setShowModalStats(true)}
          className="w-40 font-semibold rounded-sm btn btn-outline btn-rounded-sm btn-primary"
        >
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
            <rect x="3" y="12" width="4" height="8" />
            <rect x="10" y="6" width="4" height="14" />
            <rect x="17" y="3" width="4" height="17" />
            <line x1="1" y1="21" x2="23" y2="21" />
          </svg>
          Lihat Statistik
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
            {dataSetoranMahasiswa?.map(
              (data: dataSetoranMahasiswaPAProps, index) => (
                <tr
                  key={index}
                  className="text-neutral-content odd:bg-base-200 even:bg-base-300 hover:bg-base-100 active:bg-base-300"
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
                  <td>
                    {data.setoran?.length ? (
                      <button
                        onClick={() =>
                          handleCancelRowClick({
                            id_setoran: data.setoran?.[0]?.id,
                            nama: nama,
                            nim: nim,
                            surah: data.nama,
                            tgl_setoran: data.setoran?.[0]?.tgl_setoran,
                          })
                        }
                        className={`btn btn-sm btn-error rounded-sm btn-outline`}
                      >
                        ❌ Batalkan
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleACCRowClick({
                            nama: nama,
                            nim: nim,
                            surah: data.nama,
                            nomor_surah: data.nomor,
                          })
                        }
                        className={`btn btn-sm btn-base-100 rounded-sm btn-outline`}
                      >
                        ✔ ACC
                      </button>
                    )}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {showModalStats && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-50">
          <div className="relative w-11/12 max-w-2xl p-6 rounded-lg modal-box bg-base-200">
            <h2 className="mb-6 text-2xl font-bold text-center">
              🔥 Statistik Hafalan Mahasiswa
            </h2>
            <div className="space-y-6">
              {statsInfoSetoranMahasiswa?.map(
                (data: statsInfoSetoranMahasiswaProps) => (
                  <div
                    key={data.label}
                    className="p-4 transition-all duration-300 rounded-lg shadow-md bg-base-100 hover:shadow-lg hover:scale-105"
                  >
                    <div className="flex items-center mb-2">
                      <p className="text-lg font-bold">
                        {labelPersyaratan(data.label)[1]}
                      </p>
                      <span className="px-2 py-1 text-sm font-semibold">
                        ({data.persentase})
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-grow">
                        <div className="h-4 rounded-full bg-base-300">
                          <div
                            className="h-4 rounded-full bg-accent"
                            style={{
                              width: `${
                                (data.jumlah_sudah_setor /
                                  data.jumlah_wajib_setor) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <p className="text-sm font-semibold whitespace-nowrap">
                        {data.jumlah_sudah_setor}/{data.jumlah_wajib_setor}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="flex justify-center mt-6">
              <button
                className="w-1/3 btn btn-error"
                onClick={() => setShowModalStats(false)}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {showModalCancel && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-50">
          <div className="modal-box lg:ml-10">
            <h2 className="mb-6 text-xl font-bold text-center">
              ❌ Pembatalan Validasi Setoran ❌
            </h2>

            <label className="w-full form-control">
              <div className="label">
                <span className="label-text">Nama Mahasiswa</span>
              </div>
              <input
                type="text"
                value={selectedData?.nama}
                readOnly
                className="w-full cursor-not-allowed bg-base-200/70 input input-bordered focus:outline-0"
              />
            </label>
            <label className="w-full form-control">
              <div className="label">
                <span className="label-text">NIM</span>
              </div>
              <input
                type="text"
                value={selectedData?.nim}
                readOnly
                className="w-full cursor-not-allowed bg-base-200/70 input input-bordered focus:outline-0"
              />
            </label>
            <label className="w-full form-control">
              <div className="label">
                <span className="label-text">Nama Surah yang di-Setorkan</span>
              </div>
              <input
                type="text"
                value={selectedData?.surah}
                readOnly
                className="w-full cursor-not-allowed bg-base-200/70 input input-bordered focus:outline-0"
              />
            </label>
            <label className="w-full form-control">
              <div className="label">
                <span className="label-text">Tanggal Setoran Hafalan</span>
              </div>
              <input
                type="text"
                value={formatDateTime(selectedData?.tgl_setoran || "")}
                readOnly
                className="w-full cursor-not-allowed bg-base-200/70 input input-bordered focus:outline-0"
              />
            </label>

            <div className="flex justify-start gap-3 mt-6">
              <input
                type="checkbox"
                onChange={() => setIsChecked(!isChecked)}
                className="checkbox border-orange-400 [--chkbg:theme(colors.indigo.600)] [--chkfg:orange] checked:border-indigo-800"
              />
              <p>
                Saya yakin untuk{" "}
                <span className="italic font-bold">
                  membatalkan validasi hafalan surat
                </span>{" "}
                mahasiswa tersebut.
              </p>
            </div>

            <div className="modal-action">
              <button
                className="w-1/2 btn btn-rounded-sm btn-error"
                onClick={() => {
                  setshowModalCancel(false);
                  setIsChecked(false);
                }}
                disabled={isLoading}
              >
                ❌ Gak jadi deh!
              </button>

              <button
                className={`w-1/2 btn btn-rounded-sm btn-success ${
                  (!isChecked || isLoading) && "btn-disabled"
                }`}
                onClick={handleCancelSetoran}
              >
                {isLoading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "✔ Iya, batalkan validasinya!"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {showModalACC && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-50">
          <div className="modal-box lg:ml-10">
            <h2 className="mb-6 text-xl font-bold text-center">
              ✔ Validasi Pengesahan Anda ✔
            </h2>

            <label className="w-full form-control">
              <div className="label">
                <span className="label-text">Nama Mahasiswa</span>
              </div>
              <input
                type="text"
                value={selectedData?.nama}
                readOnly
                className="w-full cursor-not-allowed bg-base-200/70 input input-bordered focus:outline-0"
              />
            </label>
            <label className="w-full form-control">
              <div className="label">
                <span className="label-text">NIM</span>
              </div>
              <input
                type="text"
                value={selectedData?.nim}
                readOnly
                className="w-full cursor-not-allowed bg-base-200/70 input input-bordered focus:outline-0"
              />
            </label>
            <label className="w-full form-control">
              <div className="label">
                <span className="label-text">Nama Surah yang di-Setorkan</span>
              </div>
              <input
                type="text"
                value={selectedData?.surah}
                readOnly
                className="w-full cursor-not-allowed bg-base-200/70 input input-bordered focus:outline-0"
              />
            </label>

            <label className="w-full form-control">
              <div className="label">
                <span className="label-text">
                  Tanggal Setoran Hafalan{" "}
                  <span className="italic">
                    (klik ikon kalender untuk mengubah)
                  </span>
                </span>
              </div>
              <input
                type="date"
                value={setoranDate.toISOString().split("T")[0]}
                max={new Date().toISOString().split("T")[0]}
                onChange={(e) => setSetoranDate(new Date(e.target.value))}
                className="w-full cursor-default input input-bordered focus:outline-0"
              />
            </label>

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
                className="w-1/2 btn btn-rounded-sm btn-error"
                onClick={() => {
                  setshowModalACC(false);
                  setIsChecked(false);
                  setSetoranDate(new Date());
                }}
                disabled={isLoading}
              >
                ❌ Batalkan
              </button>

              <button
                className={`w-1/2 btn btn-rounded-sm btn-success ${
                  (!isChecked || isLoading) && "btn-disabled"
                }`}
                onClick={handleValidationSetoran}
              >
                {isLoading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "✔ Validasi"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MahasiswaPASetoran;
