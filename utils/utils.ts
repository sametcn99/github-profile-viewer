// lib/utils.js dosyasını oluşturun veya kullanılabilir bir konumda bulunan bir dosyayı seçin

// lib/utils.js dosyasında aşağıdaki gibi bir fonksiyon oluşturun
export const getSiteUrl = () => {
  // Sayfanın çalıştığı ortama göre dinamik olarak site URL'sini oluşturun
  const isProduction = process.env.NODE_ENV === "production";

  const baseUrl = isProduction
    ? "https://github-profile-next-ui.vercel.app"
    : "http://localhost:3000";

  return baseUrl;
};
