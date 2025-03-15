
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar as CalendarIcon, Clock, Upload } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format, addDays } from "date-fns";
import { id } from 'date-fns/locale';
import { toast } from '@/components/ui/use-toast';

const permissionFormSchema = z.object({
  type: z.string().min(1, { message: "Pilih jenis perizinan" }),
  startDate: z.date({ required_error: "Pilih tanggal mulai" }),
  endDate: z.date({ required_error: "Pilih tanggal selesai" }),
  reason: z.string().min(10, { message: "Alasan minimal 10 karakter" }),
  contactPerson: z.string().min(3, { message: "Kontak darurat minimal 3 karakter" }),
  contactNumber: z.string().min(10, { message: "Nomor kontak tidak valid" }),
  attachment: z.instanceof(FileList).optional(),
});

type PermissionFormValues = z.infer<typeof permissionFormSchema>;

const PermissionCreatePage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Buat Perizinan - Si-Kaji';
  }, []);

  const form = useForm<PermissionFormValues>({
    resolver: zodResolver(permissionFormSchema),
    defaultValues: {
      type: "",
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      reason: "",
      contactPerson: "",
      contactNumber: "",
    },
  });

  function onSubmit(values: PermissionFormValues) {
    // Here we would typically save to API
    console.log(values);
    
    toast({
      title: "Perizinan berhasil diajukan",
      description: `Perizinan ${values.type} telah diajukan dan menunggu persetujuan.`,
    });
    
    // Redirect back to permission page
    setTimeout(() => {
      navigate('/permission');
    }, 1500);
  }

  return (
    <DashboardLayout
      title="Buat Perizinan"
      description="Ajukan izin tidak masuk atau dispensasi kegiatan"
      userRole="student"
      userName="Siswa"
      showBackButton
      backTo="/permission"
    >
      <Card>
        <CardHeader>
          <CardTitle>Formulir Perizinan</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jenis Perizinan</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih jenis perizinan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Sakit">Sakit</SelectItem>
                          <SelectItem value="Izin">Izin Keperluan Keluarga</SelectItem>
                          <SelectItem value="Dispensasi">Dispensasi Kegiatan</SelectItem>
                          <SelectItem value="Dinas">Tugas Sekolah</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Tanggal Mulai</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={`pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                              >
                                {field.value ? (
                                  format(field.value, "PPP", { locale: id })
                                ) : (
                                  <span>Pilih tanggal mulai</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date(new Date().setHours(0, 0, 0, 0))
                              }
                              locale={id}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Tanggal Selesai</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={`pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                              >
                                {field.value ? (
                                  format(field.value, "PPP", { locale: id })
                                ) : (
                                  <span>Pilih tanggal selesai</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => {
                                const startDate = form.getValues("startDate");
                                return date < startDate;
                              }}
                              locale={id}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alasan</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Jelaskan secara detail alasan perizinan..."
                            className="min-h-24"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="contactPerson"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kontak Darurat (Nama)</FormLabel>
                      <FormControl>
                        <Input placeholder="Nama orang tua/wali" {...field} />
                      </FormControl>
                      <FormDescription>
                        Nama yang dapat dihubungi selama izin
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="contactNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nomor Telepon</FormLabel>
                      <FormControl>
                        <Input placeholder="08xxxxxxxxxx" {...field} />
                      </FormControl>
                      <FormDescription>
                        Nomor telepon yang aktif
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="attachment"
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                      <FormItem>
                        <FormLabel>Lampiran (Opsional)</FormLabel>
                        <FormControl>
                          <div className="border-2 border-dashed rounded-md p-6 cursor-pointer hover:border-primary/50 transition-colors">
                            <Input
                              type="file"
                              accept=".jpg,.jpeg,.png,.pdf"
                              className="hidden"
                              id="file-upload"
                              onChange={(e) => {
                                onChange(e.target.files);
                              }}
                              {...fieldProps}
                            />
                            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2">
                              <Upload className="h-8 w-8 text-muted-foreground" />
                              <div className="text-center">
                                <p className="text-sm font-medium">Klik untuk mengunggah</p>
                                <p className="text-xs text-muted-foreground">
                                  Surat keterangan dokter, surat dispensasi, atau dokumen pendukung lainnya (JPG, PNG, PDF)
                                </p>
                              </div>
                              {value && value.length > 0 && (
                                <div className="mt-2 text-sm font-medium">
                                  File dipilih: {value[0].name}
                                </div>
                              )}
                            </label>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate('/permission')}
                >
                  Batal
                </Button>
                <Button type="submit">Ajukan Perizinan</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default PermissionCreatePage;
