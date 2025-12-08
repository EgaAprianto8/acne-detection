// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-6 py-8 text-center text-gray-600 text-sm">
        &copy; {new Date().getFullYear()} AcneDetector. Made with ❤️ for healthier skin.
      </div>
    </footer>
  );
}