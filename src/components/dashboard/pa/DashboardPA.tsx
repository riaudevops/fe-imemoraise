import { useEffect, useState } from "react";
import useAxiosInstance from "../../../configs/axios.configs";
import { useKeycloak } from "@react-keycloak/web";
import BarChart from "../BarChart";
import { DataProps } from "../../../interfaces/common.interfaces";

const DashboardPA = () => {
  const { keycloak } = useKeycloak();
  const axiosInstance = useAxiosInstance();

  const [stats, setStats] = useState<DataProps[]>([]);
  useEffect(() => {
    axiosInstance
      .get(`/dosen/info/${keycloak.tokenParsed?.email}`)
      .then((res) => res.data.data)
      .then((res) => {
        console.log(res.stats.list_setoran_perhari);
        setStats(res.stats.list_setoran_perhari);
      });
  }, []);

  return (
    <div className="w-full h-full">
      <p className="mt-2 text-xl font-bold md:text-3xl">
        🔥 Statistik validasi setoran per-hari...
      </p>
      <p className="pt-2 pl-2 mb-6 text-sm lg:text-base">
        Berikut statistik dari total setoran yang kamu validasi per-hari dalam
        jangka waktu sebulan... ❤💛
      </p>{" "}
      <BarChart data={stats} />
      <span className="text-sm italic">*data tersebut dihitung dari kuantitas aksi acc setoran terhadap mhs bimbingan anda perhari selama sebulan belakangan ini...</span>
    </div>
  );
};

export default DashboardPA;
