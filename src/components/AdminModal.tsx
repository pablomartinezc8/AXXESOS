import React, { useState, useEffect } from 'react';
import { CompanyConfig, ProjectItem, ProductItem } from '../config/company';
import { 
  StorageService, 
  CarouselSlide, 
  CustomerOrder, 
  ContactInquiry 
} from '../services/storage';
import { 
  X, 
  Lock, 
  LogOut, 
  Layers, 
  Camera, 
  ShoppingBag, 
  FileText, 
  Inbox, 
  Download, 
  Trash2, 
  Plus, 
  Check, 
  AlertCircle, 
  Upload, 
  Save, 
  RefreshCw, 
  Database,
  ExternalLink,
  Key
} from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: CompanyConfig;
  onSaveConfig: (newConfig: CompanyConfig) => void;
  projects: ProjectItem[];
  onSaveProjects: (newProjects: ProjectItem[]) => void;
  products: ProductItem[];
  onSaveProducts: (newProducts: ProductItem[]) => void;
  carouselSlides: CarouselSlide[];
  onSaveCarouselSlides: (newSlides: CarouselSlide[]) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  projects,
  onSaveProjects,
  products,
  onSaveProducts,
  carouselSlides,
  onSaveCarouselSlides
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState<'carousel' | 'projects' | 'products' | 'config' | 'orders' | 'firebase'>('projects');

  // Form states
  const [editableConfig, setEditableConfig] = useState<CompanyConfig>(config);
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // In-line confirmation states (avoids blocked window.confirm in iframes)
  const [productToDeleteId, setProductToDeleteId] = useState<string | null>(null);
  const [projectToDeleteId, setProjectToDeleteId] = useState<string | null>(null);
  const [slideToDeleteId, setSlideToDeleteId] = useState<string | null>(null);

  // New Project Form
  const [newProject, setNewProject] = useState<Partial<ProjectItem>>({
    title: '',
    serviceType: 'Automatización de Portón Levadizo',
    category: 'levadizos',
    location: 'San Juan Capital',
    description: '',
    imageUrl: '',
    isRealWorkPhoto: true
  });

  // New Product Form
  const [newProduct, setNewProduct] = useState<Partial<ProductItem>>({
    name: '',
    category: 'corredizos',
    categoryLabel: 'Motores Corredizos',
    price: 150000,
    inStock: true,
    stockCountText: 'En stock para entrega inmediata',
    isExample: false,
    shortDescription: '',
    fullDescription: '',
    specs: { 'Alimentación': '220V', 'Garantía': '12 meses' },
    imageUrl: '/assets/aistudio/dd7b3dbf-077d-4688-8f70-81155689c7c2_777b42ff.jpg'
  });

  // New Carousel Slide Form
  const [newSlide, setNewSlide] = useState<Partial<CarouselSlide>>({
    title: '',
    subtitle: '',
    badge: 'Nuevo Portón',
    imageUrl: '',
    ctaText: 'Consultar Ahora',
    ctaLink: '#contacto',
    secondaryText: 'Ver Trabajos',
    secondaryLink: '#trabajos'
  });

  useEffect(() => {
    if (isOpen) {
      setIsAuthenticated(StorageService.isAdminLoggedIn());
      setEditableConfig(config);
      setOrders(StorageService.getOrders());
      setInquiries(StorageService.getInquiries());
    }
  }, [isOpen, config]);

  if (!isOpen) return null;

  const showSaveSuccess = (msg: string) => {
    setSaveFeedback(msg);
    setTimeout(() => setSaveFeedback(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (StorageService.loginAdmin(enteredPin)) {
      setIsAuthenticated(true);
      setPinError(false);
      setEnteredPin('');
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    StorageService.logoutAdmin();
    setIsAuthenticated(false);
  };

  // Image file to base64 converter helper
  const handleImageUpload = (file: File, callback: (base64Url: string) => void) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const showFormError = (msg: string) => {
    setFormError(msg);
    setTimeout(() => setFormError(null), 4000);
  };

  // Project Actions
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title || !newProject.imageUrl) {
      showFormError("Por favor agregá un título y seleccioná o ingresá una imagen para el trabajo.");
      return;
    }
    const created: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: newProject.title,
      serviceType: newProject.serviceType || 'Portón Automático',
      category: newProject.category || 'levadizos',
      location: newProject.location || 'San Juan',
      description: newProject.description || 'Instalación profesional de portón realizada en San Juan.',
      imageUrl: newProject.imageUrl,
      isRealWorkPhoto: true
    };
    const updated = [created, ...projects];
    onSaveProjects(updated);
    setNewProject({
      title: '',
      serviceType: 'Automatización de Portón Levadizo',
      category: 'levadizos',
      location: 'San Juan Capital',
      description: '',
      imageUrl: '',
      isRealWorkPhoto: true
    });
    showSaveSuccess("¡Trabajo guardado y publicado en la galería!");
  };

  const confirmDeleteProject = (id: string) => {
    const targetProject = projects.find(p => p.id === id);
    const updated = projects.filter(p => p.id !== id);
    onSaveProjects(updated);
    setProjectToDeleteId(null);
    showSaveSuccess(`Trabajo "${targetProject?.title || ''}" eliminado.`);
  };

  // Product Actions
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) {
      showFormError("Por favor completá nombre y precio del producto.");
      return;
    }
    const catMap: Record<string, string> = {
      'corredizos': 'Motores Corredizos',
      'levadizos': 'Motores Levadizos',
      'batientes': 'Motores Batientes',
      'controles': 'Controles y Placas',
      'seguridad': 'CCTV y Alarmas',
      'repuestos': 'Accesorios y Cremalleras'
    };
    const created: ProductItem = {
      id: `prod-${Date.now()}`,
      name: newProduct.name,
      category: newProduct.category || 'corredizos',
      categoryLabel: catMap[newProduct.category || 'corredizos'] || 'Portones',
      price: Number(newProduct.price),
      inStock: newProduct.inStock ?? true,
      stockCountText: newProduct.stockCountText || 'En stock',
      isExample: false,
      badge: 'Producto Oficial',
      shortDescription: newProduct.shortDescription || 'Equipo para automatización o seguridad.',
      fullDescription: newProduct.fullDescription || newProduct.shortDescription || '',
      specs: newProduct.specs || {},
      imageUrl: newProduct.imageUrl || '/assets/aistudio/dd7b3dbf-077d-4688-8f70-81155689c7c2_777b42ff.jpg'
    };
    const updated = [created, ...products];
    onSaveProducts(updated);
    setNewProduct({
      name: '',
      category: 'corredizos',
      categoryLabel: 'Motores Corredizos',
      price: 150000,
      inStock: true,
      stockCountText: 'En stock para entrega inmediata',
      isExample: false,
      shortDescription: '',
      fullDescription: '',
      specs: { 'Alimentación': '220V', 'Garantía': '12 meses' },
      imageUrl: '/assets/aistudio/dd7b3dbf-077d-4688-8f70-81155689c7c2_777b42ff.jpg'
    });
    showSaveSuccess("¡Producto agregado a la tienda!");
  };

  const confirmDeleteProduct = (id: string) => {
    const targetProduct = products.find(p => p.id === id);
    const updated = products.filter(p => p.id !== id);
    onSaveProducts(updated);
    setProductToDeleteId(null);
    showSaveSuccess(`Producto "${targetProduct?.name || ''}" eliminado del catálogo.`);
  };

  // Carousel Slide Actions
  const handleAddSlide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSlide.title || !newSlide.imageUrl) {
      showFormError("Por favor agregá un título y foto para la diapositiva.");
      return;
    }
    const created: CarouselSlide = {
      id: `slide-${Date.now()}`,
      title: newSlide.title,
      subtitle: newSlide.subtitle || '',
      badge: newSlide.badge || 'AXXESOS',
      imageUrl: newSlide.imageUrl,
      ctaText: newSlide.ctaText || 'Pedir Presupuesto',
      ctaLink: newSlide.ctaLink || '#contacto',
      secondaryText: newSlide.secondaryText,
      secondaryLink: newSlide.secondaryLink
    };
    const updated = [...carouselSlides, created];
    onSaveCarouselSlides(updated);
    setNewSlide({
      title: '',
      subtitle: '',
      badge: 'Nuevo Portón',
      imageUrl: '',
      ctaText: 'Consultar Ahora',
      ctaLink: '#contacto',
      secondaryText: 'Ver Trabajos',
      secondaryLink: '#trabajos'
    });
    showSaveSuccess("¡Nueva foto agregada al carrusel principal!");
  };

  const confirmDeleteSlide = (id: string) => {
    if (carouselSlides.length <= 1) {
      showFormError("El carrusel debe mantener al menos una diapositiva.");
      return;
    }
    const updated = carouselSlides.filter(s => s.id !== id);
    onSaveCarouselSlides(updated);
    setSlideToDeleteId(null);
    showSaveSuccess("Diapositiva eliminada.");
  };

  // Save Company Config Form
  const handleSaveCompanyConfig = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(editableConfig);
    showSaveSuccess("¡Datos de empresa y textos actualizados!");
  };

  // Export Data JSON
  const handleExportBackup = () => {
    const json = StorageService.exportAllDataAsJson();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `axxesos-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export Orders CSV
  const handleExportOrdersCsv = () => {
    if (orders.length === 0) {
      showFormError("No hay pedidos registrados para exportar.");
      return;
    }
    let csv = "ID,Fecha,Cliente,Telefono,Localidad,Entrega,Subtotal,Productos\n";
    orders.forEach(o => {
      const prods = o.items.map(i => `${i.quantity}x ${i.name}`).join(' | ');
      csv += `"${o.id}","${o.date}","${o.customerName}","${o.customerPhone}","${o.customerLocation}","${o.deliveryMethod}","${o.subtotal}","${prods}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pedidos-axxesos-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div 
        className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-5xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] my-auto text-white relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="px-6 py-4 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight flex items-center gap-2">
                <span>Panel de Administración AXXESOS</span>
                <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded">
                  v1.0 San Juan
                </span>
              </h2>
              <p className="text-xs text-zinc-400">
                Gestión de fotos de carrusel, galería de trabajos, catálogo de tienda y textos.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="p-2 text-zinc-400 hover:text-red-400 hover:bg-zinc-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="Cerrar sesión"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Salir</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
              aria-label="Cerrar panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Save Feedback Banner */}
        {saveFeedback && (
          <div className="bg-emerald-600 text-white px-6 py-2.5 text-xs font-bold flex items-center justify-between animate-in slide-in-from-top duration-200">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>{saveFeedback}</span>
            </div>
          </div>
        )}

        {/* Error Feedback Banner */}
        {formError && (
          <div className="bg-red-600 text-white px-6 py-2.5 text-xs font-bold flex items-center justify-between animate-in slide-in-from-top duration-200">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>{formError}</span>
            </div>
          </div>
        )}

        {/* Content Body */}
        {!isAuthenticated ? (
          /* Login Screen */
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-red-500 shadow-xl">
              <Key className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-black">Acceso para el Propietario</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Ingresá tu clave o PIN de administrador para editar contenidos, fotos y precios sin tocar código.
              </p>
            </div>

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Ingresá la clave (ej. axxesos2026)"
                  value={enteredPin}
                  onChange={(e) => {
                    setEnteredPin(e.target.value);
                    setPinError(false);
                  }}
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-xl text-center text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                  autoFocus
                />
                {pinError && (
                  <p className="text-red-400 text-xs mt-1.5 flex items-center justify-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Clave incorrecta. Clave inicial sugerida: <strong>axxesos2026</strong> o <strong>297</strong></span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl text-sm font-bold tracking-wide transition-all shadow-md active:scale-95 cursor-pointer"
              >
                Ingresar al Panel
              </button>
            </form>

            <div className="p-3 bg-zinc-950/80 rounded-xl border border-zinc-800 text-[11px] text-zinc-400">
              💡 <em>La autenticación protege este panel en el navegador. La clave puede ser modificada en la pestaña de configuración.</em>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-56 bg-zinc-950 border-r border-zinc-800 p-3 space-y-1 shrink-0 overflow-x-auto md:overflow-x-visible flex md:flex-col gap-1">
              <button
                onClick={() => setActiveTab('projects')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors text-left ${
                  activeTab === 'projects' ? 'bg-red-600 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <Camera className="w-4 h-4 shrink-0" />
                <span>Trabajos Realizados ({projects.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('products')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors text-left ${
                  activeTab === 'products' ? 'bg-red-600 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <ShoppingBag className="w-4 h-4 shrink-0" />
                <span>Productos Tienda ({products.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('carousel')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors text-left ${
                  activeTab === 'carousel' ? 'bg-red-600 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <Layers className="w-4 h-4 shrink-0" />
                <span>Carrusel Hero ({carouselSlides.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('config')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors text-left ${
                  activeTab === 'config' ? 'bg-red-600 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <FileText className="w-4 h-4 shrink-0" />
                <span>Textos y Empresa</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors text-left ${
                  activeTab === 'orders' ? 'bg-red-600 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <Inbox className="w-4 h-4 shrink-0" />
                <span>Pedidos y Consultas ({orders.length + inquiries.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('firebase')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors text-left ${
                  activeTab === 'firebase' ? 'bg-red-600 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <Database className="w-4 h-4 shrink-0" />
                <span>Firebase & Vercel</span>
              </button>

              <div className="pt-4 border-t border-zinc-850 mt-auto hidden md:block">
                <button
                  onClick={handleExportBackup}
                  className="w-full flex items-center justify-between px-3 py-2 text-[11px] text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg border border-zinc-800 transition-colors"
                >
                  <span>Descargar Backup JSON</span>
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Main Tab Panel Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6">

              {/* TAB 1: TRABAJOS REALIZADOS (GALERÍA) */}
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-black">Galería de Trabajos Realizados</h3>
                    <p className="text-xs text-zinc-400">
                      Subí fotos nuevas tomadas desde tu celular de portones levadizos, corredizos o cámaras en San Juan.
                    </p>
                  </div>

                  {/* Add New Work Form */}
                  <form onSubmit={handleAddProject} className="bg-zinc-950 p-5 rounded-xl border border-zinc-800 space-y-4">
                    <div className="text-xs font-bold text-red-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Plus className="w-4 h-4" />
                      <span>Cargar Nuevo Trabajo a la Galería</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-zinc-300 mb-1">Título del Trabajo *</label>
                        <input
                          type="text"
                          required
                          placeholder="Ej. Portón corredizo con motor rápido"
                          value={newProject.title}
                          onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                          className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-zinc-300 mb-1">Categoría</label>
                        <select
                          value={newProject.category}
                          onChange={(e) => setNewProject({ ...newProject, category: e.target.value as any })}
                          className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white"
                        >
                          <option value="levadizos">Portones Levadizos</option>
                          <option value="corredizos">Portones Corredizos</option>
                          <option value="batientes">Portones Batientes</option>
                          <option value="cctv_alarmas">CCTV y Alarmas</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-zinc-300 mb-1">Localidad / Zona en San Juan</label>
                        <input
                          type="text"
                          placeholder="Ej. Rivadavia, Santa Lucía, Rawson, Capital"
                          value={newProject.location}
                          onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                          className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-zinc-300 mb-1">Tipo de Servicio Realizado</label>
                        <input
                          type="text"
                          placeholder="Ej. Instalación de equipo corredizo 1/3 HP"
                          value={newProject.serviceType}
                          onChange={(e) => setNewProject({ ...newProject, serviceType: e.target.value })}
                          className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white"
                        />
                      </div>
                    </div>

                    {/* Image Upload or URL */}
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-zinc-300">Foto del Trabajo *</label>
                      <div className="flex flex-col sm:flex-row gap-3 items-center">
                        <label className="cursor-pointer bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 border border-zinc-700 shrink-0">
                          <Upload className="w-4 h-4 text-red-500" />
                          <span>Subir desde mi dispositivo</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handleImageUpload(e.target.files[0], (url) => {
                                  setNewProject({ ...newProject, imageUrl: url });
                                });
                              }
                            }}
                          />
                        </label>

                        <span className="text-zinc-500 text-xs">o ingresá la URL directa:</span>
                        
                        <input
                          type="text"
                          placeholder="https://... o /assets/..."
                          value={newProject.imageUrl}
                          onChange={(e) => setNewProject({ ...newProject, imageUrl: e.target.value })}
                          className="flex-1 px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white"
                        />
                      </div>

                      {newProject.imageUrl && (
                        <div className="pt-2 flex items-center gap-3">
                          <img
                            src={newProject.imageUrl}
                            alt="Previsualización"
                            className="w-20 h-16 object-cover rounded-lg border border-zinc-700"
                          />
                          <span className="text-xs text-emerald-400">✓ Foto lista para publicar</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">Descripción Breve</label>
                      <textarea
                        rows={2}
                        placeholder="Explicá brevemente qué se instaló..."
                        value={newProject.description}
                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white"
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Publicar Trabajo en la Galería
                    </button>
                  </form>

                  {/* Existing Projects List */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Trabajos Actuales ({projects.length})
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {projects.map((proj) => (
                        <div key={proj.id} className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 flex gap-3 items-center justify-between">
                          <img
                            src={proj.imageUrl}
                            alt={proj.title}
                            className="w-16 h-14 object-cover rounded-lg shrink-0 border border-zinc-800"
                          />
                          <div className="flex-1 min-w-0 text-xs">
                            <div className="font-bold truncate text-white">{proj.title}</div>
                            <div className="text-red-400 text-[11px]">{proj.serviceType}</div>
                            <div className="text-zinc-500 text-[10px]">{proj.location}</div>
                          </div>
                          <div className="flex items-center shrink-0">
                            {projectToDeleteId === proj.id ? (
                              <div className="flex items-center gap-1.5 bg-red-950/90 border border-red-600/80 p-1.5 rounded-lg animate-in fade-in">
                                <span className="text-[10px] text-red-200 font-bold whitespace-nowrap">¿Borrar?</span>
                                <button
                                  type="button"
                                  onClick={() => confirmDeleteProject(proj.id)}
                                  className="px-2 py-0.5 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold rounded cursor-pointer transition-colors"
                                >
                                  Sí
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setProjectToDeleteId(null)}
                                  className="px-1.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] rounded cursor-pointer transition-colors"
                                >
                                  No
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setProjectToDeleteId(proj.id)}
                                className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-950/30 rounded-lg transition-colors cursor-pointer"
                                title="Eliminar trabajo de la galería"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: PRODUCTOS TIENDA */}
              {activeTab === 'products' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-black">Catálogo de Productos y Precios</h3>
                    <p className="text-xs text-zinc-400">
                      Cargá los motores, repuestos, marcas y precios reales de tu comercio para sustituir los ejemplos.
                    </p>
                  </div>

                  {/* Add Product Form */}
                  <form onSubmit={handleAddProduct} className="bg-zinc-950 p-5 rounded-xl border border-zinc-800 space-y-4">
                    <div className="text-xs font-bold text-red-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Plus className="w-4 h-4" />
                      <span>Cargar Nuevo Producto</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-zinc-300 mb-1">Nombre del Producto / Modelo *</label>
                        <input
                          type="text"
                          required
                          placeholder="Ej. Motor Corredizo 1/3 HP con Cremallera"
                          value={newProduct.name}
                          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                          className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-zinc-300 mb-1">Precio en ARS ($) *</label>
                        <input
                          type="number"
                          required
                          placeholder="180000"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-zinc-300 mb-1">Categoría</label>
                        <select
                          value={newProduct.category}
                          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value as any })}
                          className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white"
                        >
                          <option value="corredizos">Motores Corredizos</option>
                          <option value="levadizos">Motores Levadizos</option>
                          <option value="batientes">Motores Batientes</option>
                          <option value="controles">Controles y Placas</option>
                          <option value="seguridad">CCTV y Alarmas</option>
                          <option value="repuestos">Accesorios y Cremalleras</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-zinc-300 mb-1">Estado de Stock</label>
                        <select
                          value={newProduct.inStock ? 'true' : 'false'}
                          onChange={(e) => setNewProduct({ ...newProduct, inStock: e.target.value === 'true' })}
                          className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white"
                        >
                          <option value="true">En Stock (Disponible)</option>
                          <option value="false">A Pedido / Consultar</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-zinc-300 mb-1">Texto de Stock</label>
                        <input
                          type="text"
                          placeholder="Ej. Disponible en local Mariano Moreno E. 297"
                          value={newProduct.stockCountText}
                          onChange={(e) => setNewProduct({ ...newProduct, stockCountText: e.target.value })}
                          className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-zinc-300">Foto del Producto</label>
                      <div className="flex flex-col sm:flex-row gap-3 items-center">
                        <label className="cursor-pointer bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 border border-zinc-700 shrink-0">
                          <Upload className="w-4 h-4 text-red-500" />
                          <span>Subir foto</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handleImageUpload(e.target.files[0], (url) => {
                                  setNewProduct({ ...newProduct, imageUrl: url });
                                });
                              }
                            }}
                          />
                        </label>
                        <input
                          type="text"
                          placeholder="o URL de imagen..."
                          value={newProduct.imageUrl}
                          onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                          className="flex-1 px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">Descripción y detalles</label>
                      <textarea
                        rows={2}
                        placeholder="Detalles técnicos, peso que soporta, controles que incluye..."
                        value={newProduct.shortDescription}
                        onChange={(e) => setNewProduct({ ...newProduct, shortDescription: e.target.value })}
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white"
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Agregar Producto al Catálogo
                    </button>
                  </form>

                  {/* Existing Products List */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Productos en Catálogo ({products.length})
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {products.map((prod) => (
                        <div key={prod.id} className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 flex gap-3 items-center justify-between">
                          <img
                            src={prod.imageUrl}
                            alt={prod.name}
                            className="w-14 h-14 object-contain rounded-lg shrink-0 bg-zinc-900 p-1 border border-zinc-800"
                          />
                          <div className="flex-1 min-w-0 text-xs">
                            <div className="font-bold truncate text-white">{prod.name}</div>
                            <div className="text-emerald-400 font-mono font-bold">$ {prod.price.toLocaleString('es-AR')}</div>
                            <div className="text-zinc-500 text-[10px]">
                              {prod.categoryLabel} • {prod.isExample ? '«Ejemplo - A CONFIRMAR»' : 'Oficial'}
                            </div>
                          </div>
                          <div className="flex items-center shrink-0">
                            {productToDeleteId === prod.id ? (
                              <div className="flex items-center gap-1.5 bg-red-950/90 border border-red-600/80 p-1.5 rounded-lg animate-in fade-in">
                                <span className="text-[10px] text-red-200 font-bold whitespace-nowrap">¿Borrar?</span>
                                <button
                                  type="button"
                                  onClick={() => confirmDeleteProduct(prod.id)}
                                  className="px-2 py-0.5 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold rounded cursor-pointer transition-colors"
                                >
                                  Sí
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setProductToDeleteId(null)}
                                  className="px-1.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] rounded cursor-pointer transition-colors"
                                >
                                  No
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setProductToDeleteId(prod.id)}
                                className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-950/30 rounded-lg transition-colors cursor-pointer"
                                title="Eliminar producto del catálogo"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: CARRUSEL HERO */}
              {activeTab === 'carousel' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-black">Fotos del Carrusel Principal</h3>
                    <p className="text-xs text-zinc-400">
                      Agregá fotos en alta resolución de portones y obras destacadas para el encabezado.
                    </p>
                  </div>

                  {/* Add Slide */}
                  <form onSubmit={handleAddSlide} className="bg-zinc-950 p-5 rounded-xl border border-zinc-800 space-y-4">
                    <div className="text-xs font-bold text-red-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Plus className="w-4 h-4" />
                      <span>Agregar Foto al Carrusel</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-zinc-300 mb-1">Título de la Diapositiva *</label>
                        <input
                          type="text"
                          required
                          placeholder="Ej. Portones Levadizos San Juan"
                          value={newSlide.title}
                          onChange={(e) => setNewSlide({ ...newSlide, title: e.target.value })}
                          className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-zinc-300 mb-1">Etiqueta Superior</label>
                        <input
                          type="text"
                          placeholder="Ej. Especialistas en Automatismos"
                          value={newSlide.badge}
                          onChange={(e) => setNewSlide({ ...newSlide, badge: e.target.value })}
                          className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">Subtítulo Descriptivo</label>
                      <input
                        type="text"
                        placeholder="Ej. Motores rápidos, controles anticopia y servicio técnico oficial."
                        value={newSlide.subtitle}
                        onChange={(e) => setNewSlide({ ...newSlide, subtitle: e.target.value })}
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-zinc-300">Foto de Fondo (Pantalla Completa) *</label>
                      <div className="flex flex-col sm:flex-row gap-3 items-center">
                        <label className="cursor-pointer bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 border border-zinc-700 shrink-0">
                          <Upload className="w-4 h-4 text-red-500" />
                          <span>Subir imagen</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handleImageUpload(e.target.files[0], (url) => {
                                  setNewSlide({ ...newSlide, imageUrl: url });
                                });
                              }
                            }}
                          />
                        </label>
                        <input
                          type="text"
                          placeholder="o URL directa de la foto..."
                          value={newSlide.imageUrl}
                          onChange={(e) => setNewSlide({ ...newSlide, imageUrl: e.target.value })}
                          className="flex-1 px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white"
                        />
                      </div>
                      {newSlide.imageUrl && (
                        <img
                          src={newSlide.imageUrl}
                          alt="Preview slide"
                          className="h-24 w-full object-cover rounded-lg border border-zinc-800 mt-2"
                        />
                      )}
                    </div>

                    <button
                      type="submit"
                      className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Guardar Diapositiva
                    </button>
                  </form>

                  {/* Carousel list */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Diapositivas Activas ({carouselSlides.length})
                    </h4>
                    <div className="space-y-2">
                      {carouselSlides.map((slide, idx) => (
                        <div key={slide.id || idx} className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 flex gap-3 items-center justify-between">
                          <img
                            src={slide.imageUrl}
                            alt={slide.title}
                            className="w-20 h-12 object-cover rounded-lg shrink-0 border border-zinc-800"
                          />
                          <div className="flex-1 min-w-0 text-xs">
                            <div className="font-bold text-white truncate">{slide.title}</div>
                            <div className="text-zinc-400 text-[11px] truncate">{slide.subtitle}</div>
                          </div>
                          <div className="flex items-center shrink-0">
                            {slideToDeleteId === slide.id ? (
                              <div className="flex items-center gap-1.5 bg-red-950/90 border border-red-600/80 p-1.5 rounded-lg animate-in fade-in">
                                <span className="text-[10px] text-red-200 font-bold whitespace-nowrap">¿Borrar?</span>
                                <button
                                  type="button"
                                  onClick={() => confirmDeleteSlide(slide.id)}
                                  className="px-2 py-0.5 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold rounded cursor-pointer transition-colors"
                                >
                                  Sí
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setSlideToDeleteId(null)}
                                  className="px-1.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] rounded cursor-pointer transition-colors"
                                >
                                  No
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setSlideToDeleteId(slide.id)}
                                className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-950/30 rounded-lg transition-colors cursor-pointer"
                                title="Eliminar diapositiva del carrusel"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: TEXTOS Y DATOS DE EMPRESA */}
              {activeTab === 'config' && (
                <form onSubmit={handleSaveCompanyConfig} className="space-y-6">
                  <div>
                    <h3 className="text-lg font-black">Datos de la Empresa y Textos</h3>
                    <p className="text-xs text-zinc-400">
                      Reemplazá los campos marcados como «A CONFIRMAR» (WhatsApp, días de atención, reseñas).
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-300 mb-1">Nombre Comercial</label>
                      <input
                        type="text"
                        value={editableConfig.name}
                        onChange={(e) => setEditableConfig({ ...editableConfig, name: e.target.value })}
                        className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-300 mb-1">Slogan</label>
                      <input
                        type="text"
                        value={editableConfig.slogan}
                        onChange={(e) => setEditableConfig({ ...editableConfig, slogan: e.target.value })}
                        className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-300 mb-1">Dirección Real en San Juan</label>
                      <input
                        type="text"
                        value={editableConfig.address}
                        onChange={(e) => setEditableConfig({ ...editableConfig, address: e.target.value })}
                        className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-300 mb-1">Teléfono Principal</label>
                      <input
                        type="text"
                        value={editableConfig.phonePrimary}
                        onChange={(e) => setEditableConfig({ ...editableConfig, phonePrimary: e.target.value })}
                        className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-xs text-white font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-300 mb-1">Teléfono Secundario</label>
                      <input
                        type="text"
                        value={editableConfig.phoneSecondary}
                        onChange={(e) => setEditableConfig({ ...editableConfig, phoneSecondary: e.target.value })}
                        className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-xs text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-amber-400 mb-1">Número de WhatsApp (wa.me) «A CONFIRMAR»</label>
                      <input
                        type="text"
                        value={editableConfig.whatsappNumber}
                        onChange={(e) => setEditableConfig({ ...editableConfig, whatsappNumber: e.target.value })}
                        className="w-full px-3 py-2 bg-zinc-950 border border-amber-600/50 rounded-lg text-xs text-white font-mono"
                        placeholder="549264..."
                      />
                      <span className="text-[10px] text-zinc-400">Formato numérico internacional sin guiones (ej. 5492644062942)</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-300 mb-1">Horario Comercial (con corte al mediodía)</label>
                      <input
                        type="text"
                        value={editableConfig.workingHoursSchedule}
                        onChange={(e) => setEditableConfig({ ...editableConfig, workingHoursSchedule: e.target.value })}
                        className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-amber-400 mb-1">Días de Atención «A CONFIRMAR»</label>
                      <input
                        type="text"
                        value={editableConfig.workingHoursDaysNotice}
                        onChange={(e) => setEditableConfig({ ...editableConfig, workingHoursDaysNotice: e.target.value })}
                        className="w-full px-3 py-2 bg-zinc-950 border border-amber-600/50 rounded-lg text-xs text-white"
                        placeholder="Ej. Lunes a Viernes de 8:30 a 12:30 y 16:30 a 20:30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-300 mb-1">Instagram (@axxesos)</label>
                      <input
                        type="text"
                        value={editableConfig.instagram}
                        onChange={(e) => setEditableConfig({ ...editableConfig, instagram: e.target.value })}
                        className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-300 mb-1">Calificación Google</label>
                      <input
                        type="number"
                        step="0.1"
                        value={editableConfig.googleRating}
                        onChange={(e) => setEditableConfig({ ...editableConfig, googleRating: Number(e.target.value) })}
                        className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-xs text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-300 mb-1">Cantidad Opiniones Google</label>
                      <input
                        type="number"
                        value={editableConfig.googleReviewCount}
                        onChange={(e) => setEditableConfig({ ...editableConfig, googleReviewCount: Number(e.target.value) })}
                        className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-xs text-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">Quiénes Somos - Resumen Principal</label>
                    <textarea
                      rows={3}
                      value={editableConfig.aboutShort}
                      onChange={(e) => setEditableConfig({ ...editableConfig, aboutShort: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">Quiénes Somos - Texto Detallado</label>
                    <textarea
                      rows={4}
                      value={editableConfig.aboutFull}
                      onChange={(e) => setEditableConfig({ ...editableConfig, aboutFull: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-xs text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <Save className="w-4 h-4" />
                    <span>Guardar Cambios de la Empresa</span>
                  </button>
                </form>
              )}

              {/* TAB 5: PEDIDOS Y CONSULTAS RECIBIDAS */}
              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-black">Historial de Pedidos y Consultas</h3>
                      <p className="text-xs text-zinc-400">
                        Registro local de cotizaciones iniciadas por clientes desde la web.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleExportOrdersCsv}
                        className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-zinc-700"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Exportar a Excel (CSV)</span>
                      </button>
                    </div>
                  </div>

                  {/* Orders table */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Pedidos de Tienda ({orders.length})
                    </h4>
                    {orders.length === 0 ? (
                      <div className="p-6 bg-zinc-950 rounded-xl border border-zinc-800 text-center text-xs text-zinc-500">
                        No hay pedidos registrados todavía.
                      </div>
                    ) : (
                      <div className="divide-y divide-zinc-800 border border-zinc-800 rounded-xl overflow-hidden bg-zinc-950 text-xs">
                        {orders.map((o) => (
                          <div key={o.id} className="p-4 flex flex-col sm:flex-row justify-between gap-3">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-bold text-red-500">{o.id}</span>
                                <span className="text-zinc-400 text-[11px]">{o.date}</span>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                  o.status === 'nuevo' ? 'bg-amber-950 text-amber-400 border border-amber-800' : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                }`}>
                                  {o.status}
                                </span>
                              </div>
                              <div className="font-bold text-white">{o.customerName} - Tel: {o.customerPhone}</div>
                              <div className="text-zinc-400 text-[11px]">Zona: {o.customerLocation} • Entrega: {o.deliveryMethod}</div>
                              <div className="text-zinc-300 pt-1">
                                {o.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <div className="font-mono font-black text-white text-base">
                                $ {o.subtotal.toLocaleString('es-AR')}
                              </div>
                              <select
                                value={o.status}
                                onChange={(e) => {
                                  StorageService.updateOrderStatus(o.id, e.target.value as any);
                                  setOrders(StorageService.getOrders());
                                }}
                                className="mt-2 text-[11px] bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-zinc-200"
                              >
                                <option value="nuevo">Nuevo</option>
                                <option value="contactado">Contactado</option>
                                <option value="completado">Completado</option>
                              </select>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Inquiries table */}
                  <div className="space-y-3 pt-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Consultas del Formulario de Contacto ({inquiries.length})
                    </h4>
                    {inquiries.length === 0 ? (
                      <div className="p-6 bg-zinc-950 rounded-xl border border-zinc-800 text-center text-xs text-zinc-500">
                        No hay consultas registradas todavía.
                      </div>
                    ) : (
                      <div className="divide-y divide-zinc-800 border border-zinc-800 rounded-xl overflow-hidden bg-zinc-950 text-xs">
                        {inquiries.map((inq) => (
                          <div key={inq.id} className="p-4 space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-white">{inq.name} ({inq.phone})</span>
                              <span className="text-zinc-500 text-[11px]">{inq.date}</span>
                            </div>
                            <div className="text-red-400 text-xs font-medium">Interés: {inq.serviceInterest}</div>
                            {inq.message && <div className="text-zinc-300 italic">"{inq.message}"</div>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 6: FIREBASE & VERCEL DEPLOYMENT GUIDE */}
              {activeTab === 'firebase' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-black">Guía de Conexión a Firebase y Despliegue en Vercel</h3>
                    <p className="text-xs text-zinc-400">
                      Paso a paso para almacenar permanentemente fotos, productos y consultas en la nube y compartir entre múltiples dispositivos.
                    </p>
                  </div>

                  {/* Status Banner */}
                  <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/80 text-amber-200 text-xs space-y-2">
                    <div className="font-bold flex items-center gap-1.5 text-amber-400">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>Modo actual: Almacenamiento local (Prototipo funcional)</span>
                    </div>
                    <p className="text-amber-300/80 leading-relaxed">
                      Actualmente todos los cambios, subidas de fotos y pedidos se guardan en el <strong>localStorage del navegador</strong>. Esto significa que la web es 100% interactiva de inmediato, pero las fotos cargadas no se verán en otros celulares o computadoras hasta conectar una base de datos centralizada como Firebase.
                    </p>
                  </div>

                  {/* Step by step */}
                  <div className="space-y-4 text-xs text-zinc-300 leading-relaxed">
                    <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                      <h4 className="font-bold text-white text-sm">Paso 1: Crear proyecto gratuito en Firebase</h4>
                      <ol className="list-decimal list-inside space-y-1 text-zinc-400 pl-1">
                        <li>Ingresá a <span className="text-red-400">console.firebase.google.com</span> con tu cuenta de Google.</li>
                        <li>Creá un nuevo proyecto llamado <strong>axxesos-web</strong>.</li>
                        <li>En el menú lateral activá:
                          <ul className="list-disc list-inside pl-4 text-zinc-300 mt-1 space-y-0.5">
                            <li><strong>Cloud Firestore:</strong> Base de datos para guardar productos, trabajos y pedidos.</li>
                            <li><strong>Cloud Storage:</strong> Para almacenar las fotos en alta resolución.</li>
                            <li><strong>Authentication:</strong> Acceso por correo/contraseña para el dueño.</li>
                          </ul>
                        </li>
                      </ol>
                    </div>

                    <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                      <h4 className="font-bold text-white text-sm">Paso 2: Variables de entorno para Vercel</h4>
                      <p className="text-zinc-400">
                        En el panel de tu proyecto en Vercel (Project Settings &rarr; Environment Variables), añadí las siguientes claves que te entrega Firebase:
                      </p>
                      <pre className="p-3 bg-zinc-900 rounded-lg text-emerald-400 font-mono text-[11px] overflow-x-auto">
{`VITE_FIREBASE_API_KEY="tu_api_key_aqui"
VITE_FIREBASE_AUTH_DOMAIN="axxesos-web.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="axxesos-web"
VITE_FIREBASE_STORAGE_BUCKET="axxesos-web.appspot.com"
VITE_FIREBASE_MESSAGING_SENDER_ID="tu_sender_id"
VITE_FIREBASE_APP_ID="tu_app_id"`}
                      </pre>
                    </div>

                    <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                      <h4 className="font-bold text-white text-sm">Paso 3: Despliegue en Vercel</h4>
                      <p className="text-zinc-400">
                        Este proyecto está preparado para desplegar en 1 clic en Vercel con Vite:
                      </p>
                      <pre className="p-3 bg-zinc-900 rounded-lg text-zinc-200 font-mono text-[11px] overflow-x-auto">
{`# 1. Instalar Vercel CLI (opcional):
npm i -g vercel

# 2. Desplegar:
vercel --prod`}
                      </pre>
                      <p className="text-zinc-400 text-[11px]">
                        O simplemente conectá tu repositorio de GitHub a Vercel, y detectará automáticamente el framework Vite con `npm run build`.
                      </p>
                    </div>
                  </div>

                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
