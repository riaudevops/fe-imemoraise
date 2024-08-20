import useAxiosInstance from "../../../configs/axios.configs";
import { useKeycloak } from "@react-keycloak/web";
import { statsInfoSetoranMahasiswaProps } from "../../../interfaces/common.interfaces";
import { useEffect, useState } from "react";
import { labelPersyaratan } from "../Constant";

const DashboardMahasiswa = () => {
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
  }, [axiosInstance, keycloak.tokenParsed?.email]);

  return (
    <>
      <p className="mt-2 text-xl font-bold md:text-3xl">
        🔥 Progress Setoran hafalan mu...
      </p>
      <p className="pt-2 pl-2 mb-6 text-sm lg:text-base">
        Berikut statistik progress dari setoran hafalan kamu untuk persyaratan
        akademik di UIN Suska Riau, Semangat terus yaa.. ❤💛
      </p>

      <div className="space-y-6">
        {statsInfoSetoranMahasiswa?.map(
          (data: statsInfoSetoranMahasiswaProps) => (
            <div
              key={data.label}
              className="p-6 transition-colors rounded-lg bg-base-200 hover:bg-base-300 hover:skew-y-1"
            >
              <p className="mb-4 text-lg font-bold">
                {labelPersyaratan(data.label)[1]} ({data.persentase})
              </p>
              <div className="flex items-center gap-4">
                <progress
                  className="flex-grow h-8 progress progress-accent"
                  value={data.jumlah_sudah_setor}
                  max={data.jumlah_wajib_setor}
                />
                <p className="text-lg italic whitespace-nowrap">
                  ({data.jumlah_sudah_setor}/{data.jumlah_wajib_setor})
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default DashboardMahasiswa;
