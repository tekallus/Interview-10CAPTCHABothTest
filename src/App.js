import { useEffect, useState } from "react";

// Resim URL'lerini tanımla
const ONE = "https://images.pexels.com/photos/2249528/pexels-photo-2249528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const TWO = "https://images.pexels.com/photos/1061141/pexels-photo-1061141.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const THREE = "https://images.pexels.com/photos/2249530/pexels-photo-2249530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const FOUR = "https://images.pexels.com/photos/1061139/pexels-photo-1061139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const FIVE = "https://images.pexels.com/photos/1010973/pexels-photo-1010973.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const SIX = "https://images.pexels.com/photos/4772874/pexels-photo-4772874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

function App() {
  return <Captcha />;
}

const Captcha = () => {
  // Modal durumunu ve doğru cevabı tutan state'leri tanımlayalim
  const [modalOpen, setModalOpen] = useState(false);//modalOpen state'i, modal penceresinin açık veya kapalı olduğunu takip edebilmek icin.
  const [correctAnswer, setCorrectAnswer] = useState(null);//correctAnswer state'i, doğru cevabı (rastgele bir sayı) saklamak icin

  // Modal açıldığında, rastgele bir doğru cevap belirleyelim
  useEffect(() => {

    //rastgele bir sayi uretmek icin Math.random(),0 ile 6 arasında rastgele bir ondalık sayı olmasi icin Math.random() * 6,
    //rastgele ondalık sayıyı tam sayıya cevirmek icin Math.floor(Math.random() * 6),index ile esitlemek icin +1 
    // bu islemler randomIndex e 1-6 arasinda rastgele bir sayı atanır. 
    const randomIndex = Math.floor(Math.random() * 6) + 1;
    setCorrectAnswer(randomIndex);
  }, [modalOpen]);

  // Butona tıklandığında modalı açan fonksiyon
  const handleButtonClick = () => {
    //Doğru cevap seçildiğinde veya yanlış seçim yapıldıktan sonra modal penceresi kapanır.
    setModalOpen(true);
  };

  // Resimlere tıklandığında işlemi yöneten fonksiyon
  const handleImageClick = (index) => {
    // Seçilen resim doğru cevaba eşitse modalı kapat, değilse hata mesajı göster
    if (index === correctAnswer) {
      setModalOpen(false);
    } else {
      alert("Yanlış seçim! Lütfen tekrar deneyin.");
    }
  };


  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {!modalOpen ? (
        // Modal kapalıysa, butonu renderla
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={handleButtonClick}>
          CAPTCHA Testi
        </button>
      ) : (
        // Modal açıldığında, resimleri ve doğru cevabı göster
        <>
          <h3>Hangi resimde {correctAnswer} rakamı var?</h3>
          <div className="grid grid-cols-3 mt-3 gap-0">
            {[ONE, TWO, THREE, FOUR, FIVE, SIX].map((image, index) => (
              // Her resmi renderla, index+1, resmin numarasını temsil eder
              <img
                key={index}
                src={image}
                alt={`Resim ${index + 1}`}
                className="max-w-xs max-h-32"
                onClick={() => handleImageClick(index + 1)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
