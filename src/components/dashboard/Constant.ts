export const labelPersyaratan = (persyaratan: string) => {
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

export const formatDateTime = (isoString: string) => {
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
