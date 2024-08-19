const FAQs = () => {
  const faqs = [
    {
      question: "Apa itu iMemoraise?",
      answer:
        "iMemoraise adalah sebuah sistem informasi berbasis web yang dirancang untuk mendukung proses penyetoran dan pengelolaan hafalan ayat-ayat Al-Quran di kampus. Platform ini memungkinkan dosen pembimbing akademik merekap setoran hafalan mahasiswa bimbingannya secara online, memantau perkembangan, dan lain sebagainya, mahasiswa pun dapat melihat perkembangan progres setoran ia, dan dapat lebih mempersiapkan mana surah yang harus ia setor untuk memenuhi persyaratan akademik tertentu.",
    },
    {
      question: "Bagaimana cara mendaftar di iMemoraise?",
      answer:
        "Anda hanya perlu mendaftar dengan email resmi @uin.suska.ac.id, lalu silahkan set password Anda, dan Anda sudah bisa login untuk menikmati layanan di-iMemoraise.",
    },
    {
      question: "Bagaimana cara menyetor hafalan Al-Quran melalui iMemoraise?",
      answer:
        "Untuk menyetor hafalan Al-Quran, Anda harus konfirmasi terlebih dahulu ke dosen PA Anda terkait bagaimana prosedur penyetoran dengan beliau, lalu Anda tinggal setor saja sesuai prosedur yang ditetapkan oleh dosen PA Anda, dan nanti dosen PA Anda akan melakukan menyetujui ataupun menolak penyetoran hafalan Anda berdasarkan penilaian beliau, dan status setoran Anda dapat Anda lihat di dashboard setoran bagi mahasiswa.",
    },
    {
      question: "Bagaimana cara memantau perkembangan hafalan saya?",
      answer:
        "Anda dapat memantau progres hafalan melalui dashboard di akun iMemoraise Anda bagi mahasiswa. Di sana, Anda akan melihat ringkasan hafalan yang telah disetor, progress bar setoran hafalan untuk persyaratan akademik Anda, dan perkembangan keseluruhan hafalan Anda.",
    },
  ];

  return (
    <div className="px-16 py-24 bg-base-100">
      <h2 className="mb-8 text-3xl font-bold text-center">
        Pertanyaan yang Sering Diajukan Mengenai iMemoraise.
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="collapse collapse-arrow bg-base-200/50">
            <input type="radio" name="my-accordion-2" />
            <div className="text-xl font-medium collapse-title">
              {faq.question}
            </div>
            <div className="collapse-content">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
