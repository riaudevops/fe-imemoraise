const FAQs = () => {
  const faqs = [
    { question: "Pertanyaan 1?" },
    { question: "Pertanyaan 2?" },
    { question: "Pertanyaan 3?" },
    { question: "Pertanyaan 4?" },
  ];

  return (
    <div className="px-16 py-24 bg-base-100">
      <h2 className="mb-8 text-3xl font-bold text-center">
        FAQs About iMemoraise.
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="collapse collapse-arrow bg-base-200/50">
            <input type="radio" name="my-accordion-2" />
            <div className="text-xl font-medium collapse-title">
              {faq.question}
            </div>
            <div className="collapse-content">
              <p>Jawaban akan ditampilkan di sini.</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
