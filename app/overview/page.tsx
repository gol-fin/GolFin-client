import Header from '@/components/Header';

export default function Overview() {
  return (
    <div className="min-h-full">
      <Header activeTab='Tổng quan' />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="h-96 rounded-lg border-4 border-dashed border-gray-200 bg-white shadow-sm flex items-center justify-center">
              <span className="text-gray-500">Main Content Area</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}