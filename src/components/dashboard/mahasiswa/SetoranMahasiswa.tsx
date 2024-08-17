import { useEffect, useState } from "react";
import { ThemeProps } from "../../../types/common.types";
import { Layout, sidebarMahasiswaItems } from "../Layout";
import useAxiosInstance from "../../../configs/axios.configs";
import { useKeycloak } from "@react-keycloak/web";

interface dataSetoranMahasiswaProps {
  nama: string;
  label: string;
  setoran?: [
    {
    tgl_validasi: string;
    dosen: {
      nama: string;
    };
  }];
}

const formatDateTime = (isoString: string) => {

  if (!isoString) return '';
  
  const date = new Date(isoString);
  const dateOptions = { day: 'numeric' as const, month: 'long' as const, year: 'numeric' as const };
  return date.toLocaleDateString('id-ID', dateOptions).replace(/(\d+ \w+)/, '$1,');
}

interface selectedDataForModalBoxInfoProps {
  surah: string;
  tgl_validasi: string;
  dosen: string;
}

const SetoranMahasiswa = ({ setTheme, currentTheme }: ThemeProps) => {
  
  const axiosInstance = useAxiosInstance();
  const { keycloak } = useKeycloak();

  const [nama, setNama] = useState<string>();
  const [nim, setNim] = useState<string>();

  const [dataSetoranMahasiswa, setDataSetoranMahasiswa] = useState<dataSetoranMahasiswaProps[]>();

  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState<selectedDataForModalBoxInfoProps>();

  const handleRowClick = (data: selectedDataForModalBoxInfoProps) => {
    setSelectedData(data);
    setShowModal(true);
  };

  useEffect(() => {

    axiosInstance.get(`/mahasiswa/info/${keycloak.tokenParsed?.email}`)
    .then((res) => res.data.data)
    .then((res) => {
      setNama(res.nama);
      setNim(res.nim);
    })
    
    axiosInstance.get(`/mahasiswa/surah/${keycloak.tokenParsed?.email.split("@")[0]}`)
    .then((res) => res.data.data)
    .then((res) => {
      setDataSetoranMahasiswa(res);
    })
  }, []);

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
      sidebarItems={sidebarMahasiswaItems}
      subpageTitle="Setoran Mahasiswa"
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
            🖨️  Cetak
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
              </tr>
            </thead>
            <tbody>
              {dataSetoranMahasiswa?.map((data, index) => (
                <tr onClick={() => handleRowClick({
                  surah: data.nama,
                  tgl_validasi: formatDateTime(data.setoran?.[0]?.tgl_validasi || ''),
                  dosen: data.setoran?.[0]?.dosen?.nama || '',
                })} key={index} className="text-neutral-content odd:bg-base-200 even:bg-base-300 hover:bg-base-100 hover:cursor-pointer active:bg-base-300">
                  <th className="text-base-content">{data.setoran?.length ? '✔' : ''} {index + 1}.</th>
                  <td className="font-bold text-base-content">{data.nama}</td>
                  <td className="text-base-content underline italic">{formatDateTime(data.setoran?.[0]?.tgl_validasi || '')}</td>
                  <td>
                    <div className={` ${labelPersyaratan(data.label)[0]} py-2 rounded-sm`}>
                      <p className="font-semibold text-base-content">{labelPersyaratan(data.label)[1]}</p>
                    </div>
                  </td>
                  <td className="text-base-content underline italic">{data.setoran?.[0]?.dosen.nama}</td>
                </tr>              
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div onClick={() => setShowModal(false)} className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-65 flex justify-center items-center" style={{ zIndex: 9999 }}>
            <div className="flex flex-col justify-center items-center lg:ml-10 w-96 bg-base-100 p-4 rounded-md">
              <h2 className="text-xl font-bold mb-2">Detail Riwayat Penyetoran Anda:</h2>
              
              <div className="mt-3 w-full p-2 bg-warning/20 font-medium">
                <p className="text-lg text-center">Nama Surah</p>
              </div>
              <div className="w-full p-2 bg-base-300">
                <p className="text-lg text-center">{selectedData?.surah}</p>
              </div>              
              
              { selectedData?.tgl_validasi 
                ? (
                <>
                  <div className="mt-4 w-full p-2 bg-warning/20 font-medium">
                    <p className="text-lg text-center">Tanggal Setoran Hafalan</p>
                  </div>
                  <div className="w-full p-2 bg-base-300">
                    <p className="text-lg text-center">{selectedData?.tgl_validasi}</p>
                  </div>    
                  <div className="mt-4 w-full p-2 bg-warning/20 font-medium">
                    <p className="text-lg text-center">Dosen yang Mengesahkan</p>
                  </div>
                  <div className="w-full p-2 bg-base-300">
                    <p className="text-lg text-center">{selectedData?.dosen}</p>
                  </div>    
                  <p className="mt-4 text-base">✅ Anda <span className="underline italic font-semibold">telah menyetorkan</span> surah tersebut.</p>
                </>
                ) :
                <p className="mt-4 text-base">❌ Anda <span className="underline italic font-semibold">belum menyetorkan</span> surah tersebut.</p>
              }
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
};

export default SetoranMahasiswa;
