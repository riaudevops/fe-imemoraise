const FAQs = () => {
  const faqs = [
    {
      question: "Apa itu iMemoraise?",
      answer:
        "iMemoraise adalah sebuah sistem informasi berbasis web yang dirancang untuk mendukung proses penyetoran dan pengelolaan hafalan ayat-ayat Al-Quran di kampus. Platform ini memungkinkan mahasiswa menyetor hafalan secara online, memantau perkembangan, dan menerima feedback dari pengajar.",
    },
    {
      question: "Bagaimana cara mendaftar di iMemoraise?",
      answer:
        "Untuk mendaftar di iMemoraise, Anda perlu mengunjungi halaman pendaftaran di situs web kami dan mengisi formulir dengan informasi yang diperlukan, seperti nama, alamat email, dan nomor mahasiswa. Setelah itu, Anda akan menerima email konfirmasi untuk mengaktifkan akun Anda.",
    },
    {
      question: "Bagaimana cara menyetor hafalan Al-Quran melalui iMemoraise?",
      answer:
        "Untuk menyetor hafalan Al-Quran, Anda harus login ke akun iMemoraise Anda, lalu pilih menu 'Setor Hafalan'. Ikuti instruksi yang ada untuk merekam atau mengunggah hafalan Anda. Setelah disetor, pengajar akan meninjau hafalan Anda dan memberikan feedback.",
    },
    {
      question: "Bagaimana cara memantau perkembangan hafalan saya?",
      answer:
        "Anda dapat memantau progres hafalan Anda melalui dashboard di akun iMemoraise Anda. Di sana, Anda akan melihat ringkasan hafalan yang telah disetor, feedback dari pengajar, dan perkembangan keseluruhan hafalan Anda.",
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
