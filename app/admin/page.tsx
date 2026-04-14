export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(to_bottom,#f8fbff,#eef2ff)] px-4 py-12">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Admin Paneli</h1>
        <p className="mt-4 text-slate-600 leading-8">
          Bu sürümde kayıtlar e-posta üzerinden yönetilmektedir.
          Gelen başvurular doğrudan yönetici e-posta adresine gönderilir.
          İleride veritabanı eklenirse bu alan gerçek admin paneline dönüştürülebilir.
        </p>
      </div>
    </main>
  );
}