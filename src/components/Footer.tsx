export default function Footer() {
    return (
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600">
                © {new Date().getFullYear()} BlogGenerate. All rights reserved.
              </p>
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-primary">
                Terms
              </a>
              <a href="#" className="text-gray-600 hover:text-primary">
                Privacy
              </a>
              <a href="#" className="text-gray-600 hover:text-primary">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    )
  }