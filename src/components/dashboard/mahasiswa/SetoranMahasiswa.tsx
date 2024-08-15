import { useEffect } from "react";
import { ThemeProps } from "../../../types/common.types";
import { Layout, sidebarMahasiswaItems } from "../Layout";

const SetoranMahasiswa = ({ setTheme, currentTheme }: ThemeProps) => {
  const nama = "Fulania";
  const nim = "12250113444";
  const sorting = (persyaratan: string) => {
    switch (persyaratan) {
      case "KP":
        return "bg-primary";
      case "SEMKP":
        return "bg-warning";
      case "DAFTAR_TA":
        return "bg-accent";
      case "SEMPRO":
        return "bg-success";
      case "SIDANG_TA":
        return "bg-error";
      default:
        return "";
    }
  };
  useEffect(() => {
    sorting("KP");
  }, []);
  return (
    <Layout
      setTheme={setTheme}
      currentTheme={currentTheme}
      sidebarItems={sidebarMahasiswaItems}
      subpageTitle="Setoran Mahasiswa"
    >
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <div className="font-semibold">
            <div className="flex">
              <span className="w-20">Nama</span>
              <span>: {nama}</span>
            </div>
            <div className="flex">
              <span className="w-20">Nim</span>
              <span>: {nim}</span>
            </div>
          </div>
          <button className="btn btn-rounded-sm btn-primary rounded-sm w-32 text-lg font-semibold">
            🖨️ Cetak
          </button>{" "}
        </div>
        {/* Table Setoran */}
        <div className="overflow-x-auto rounded-xl">
          <table className="table text-center">
            {/* head */}
            <thead className="bg-primary font-bold text-sm rounded-md text-base-100">
              <tr>
                <th>No</th>
                <th>Surah</th>
                <th>Date</th>
                <th>Persyaratan</th>
                <th>Nama Dosen</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr className="text-neutral-content odd:bg-base-200 even:bg-base-300">
                <th className="text-base-content">1</th>
                <td className="font-bold text-base-content">An-Naba</td>
                <td className="text-base-content">Juli 27,2024 </td>
                <td>
                  <div className={` ${sorting("KP")} py-2 rounded-sm`}>
                    <p className="font-semibold text-base-content">Kerja Praktek</p>
                  </div>
                </td>
                <td className="text-base-content">Siti Ramadhani</td>
              </tr>
              {/* row 2 */}
              <tr className="text-neutral-content odd:bg-base-200 even:bg-base-300">
                <th className="text-base-content">2</th>
                <td className="font-bold text-base-content">An-Naazi'aat</td>
                <td className="text-base-content">Juli 27,2024 </td>
                <td className={`text-base-content`}>
                  <div className={`${sorting("SEMKP")} py-2 rounded-sm`}>
                    <p className="font-semibold text-base-content">Seminar Kerja Prakter</p>
                  </div>
                </td>
                <td className="text-base-content">Siti Ramadhani</td>
              </tr>
              {/* row 3 */}
              <tr className="text-neutral-content odd:bg-base-200 even:bg-base-300">
                <th className="text-base-content">3</th>
                <td className="font-bold text-base-content">Abasa</td>
                <td className="text-base-content">Juli 27,2024 </td>
                <td className={`text-base-content`}>
                  <div className={`${sorting("DAFTAR_TA")} py-2 rounded-sm`}>
                    <p className="font-semibold text-base-content">Pendaftaran Judul TA</p>
                  </div>
                </td>
                <td className="text-base-content">Siti Ramadhani</td>
              </tr>
              {/* row 4 */}
              <tr className="text-neutral-content odd:bg-base-200 even:bg-base-300">
                <th className="text-base-content">4</th>
                <td className="font-bold text-base-content">At-Takwiir</td>
                <td className="text-base-content">Juli 27,2024 </td>
                <td>
                  <div className={`${sorting("SEMPRO")} py-2 rounded-sm`}>
                    <p className="font-semibold text-base-content">Seminar Proposal</p>
                  </div>
                </td>{" "}
                <td className="text-base-content">Siti Ramadhani</td>
              </tr>
              {/* row 5 */}
              <tr className="text-neutral-content odd:bg-base-200 even:bg-base-300">
                <th className="text-base-content">5</th>
                <td className="font-bold text-base-content">Al-Infithaar</td>
                <td className="text-base-content">Juli 27,2024 </td>
                <td>
                  <div className={`${sorting("SIDANG_TA")} py-2 rounded-sm`}>
                    <p className="font-semibold text-base-content">Sidang Tugas Akhir</p>
                  </div>
                </td>{" "}
                <td className="font-semibold text-base-content">Siti Ramadhani</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default SetoranMahasiswa;
