import axios from "axios";

// ? axios = HTTP istekleri yapmak için kullanılır.

// ! searchBook fonksiyonumunda Google Books API'ye istek atmak için fonksiyon oluşturuyorum.

const searchBook = async (term, searchBy = "intitle") => {
  // ? API_KEY google books API'ye istek atarken gerektiği için tanımlıyorum, axios.get ile Google Books API'ye get isteği atıyorum

  const API_KEY = "AIzaSyBfvcfm0g1JIZNKGay2q2qifZULH9cR1E4";
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${searchBy}:${term}&key=${API_KEY}&maxResults=20`
    );
    // ? Başarılı bir şekil de apiden veriler geldiğinde bu veri 'response.data.items' üzerinden alınır.Bu veri, kitapların detaylarını içerir.
    const bookData = response.data.items;
    return bookData;
  } catch (error) {
    // ? Eğer google-books-api'ye attığım get isteğinde bir hata oluşursa 'try-catch' bloğu içindeki 'catch' bloğu devreye girer.'console.error' ifadesi, JavaScript'te hata mesajlarını konsola yazdırmak için kullanılır. 'console.error' ifadesi, hata ayıklama süreçlerinde ve kullanıcıya hatayla ilgili bilgi sağlamak için kullanılır.
    console.error("API isteği sırasında hata oluştu:", error);
  }
};

export default searchBook;

// ! searchBook başka dosyalarda kullanılmak üzere 'export' ile dışarıya aktarılır.
