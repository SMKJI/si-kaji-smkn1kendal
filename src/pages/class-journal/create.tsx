
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CalendarIcon, Check, Clock, Save, Upload } from 'lucide-react';
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const journalFormSchema = z.object({
  date: z.date({
    required_error: "Tanggal wajib diisi",
  }),
  journalType: z.string({
    required_error: "Jenis jurnal wajib dipilih",
  }),
  title: z.string().min(5, {
    message: "Judul minimal 5 karakter",
  }),
  content: z.string().min(20, {
    message: "Isi jurnal minimal 20 karakter",
  }),
  actions: z.string().optional(),
  followUp: z.string().optional(),
  attachment: z.instanceof(FileList).optional(),
});

type JournalFormValues = z.infer<typeof journalFormSchema>;

const ClassJournalCreatePage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<JournalFormValues>({
    resolver: zodResolver(journalFormSchema),
    defaultValues: {
      date: new Date(),
      journalType: "",
      title: "",
      content: "",
      actions: "",
      followUp: "",
    },
  });

  const journalType = form.watch("journalType");

  function onSubmit(values: JournalFormValues) {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      
      toast({
        title: "Jurnal berhasil disimpan",
        description: `Jurnal perwalian "${values.title}" telah berhasil disimpan.`,
      });
      
      setIsSubmitting(false);
      
      // Redirect back to journals page
      setTimeout(() => {
        navigate('/class-journal');
      }, 1500);
    }, 1000);
  }

  return (
    <DashboardLayout
      title="Buat Jurnal Perwalian"
      description="Catat aktivitas perwalian dan perkembangan kelas secara digital"
      userRole="class_teacher"
      userName="Wali Kelas"
      showBackButton
      backTo="/class-journal"
    >
      <Card>
        <CardHeader>
          <CardTitle>Formulir Jurnal Perwalian</CardTitle>
          <CardDescription>
            Dokumentasikan kegiatan perwalian untuk monitoring perkembangan kelas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Tanggal</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pilih tanggal</span>
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
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="journalType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jenis Jurnal</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih jenis jurnal" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="meeting">Pertemuan Kelas</SelectItem>
                          <SelectItem value="academic">Evaluasi Akademik</SelectItem>
                          <SelectItem value="discipline">Pembinaan Kedisiplinan</SelectItem>
                          <SelectItem value="extracurricular">Kegiatan Ekstrakurikuler</SelectItem>
                          <SelectItem value="parentMeeting">Pertemuan Orang Tua</SelectItem>
                          <SelectItem value="special">Penanganan Khusus</SelectItem>
                          <SelectItem value="other">Lainnya</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Judul Jurnal</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Berikan judul yang menggambarkan isi jurnal..." 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Isi Jurnal</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tuliskan isi jurnal secara detail..."
                            className="min-h-32"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Jelaskan aktivitas yang dilakukan, situasi kelas, dan hal penting lainnya
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="actions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tindakan yang Dilakukan</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tindakan yang telah dilakukan untuk mengatasi masalah atau meningkatkan performa kelas..."
                            className="min-h-24"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="followUp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tindak Lanjut</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Rencana tindak lanjut di masa mendatang..."
                            className="min-h-24"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="attachment"
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                      <FormItem>
                        <FormLabel>Lampiran (Opsional)</FormLabel>
                        <FormControl>
                          <div className="border-2 border-dashed rounded-md p-6">
                            <Input
                              type="file"
                              accept=".jpg,.jpeg,.png,.pdf,.docx,.xlsx"
                              className="hidden"
                              id="file-upload"
                              onChange={(e) => onChange(e.target.files)}
                              {...fieldProps}
                            />
                            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2">
                              <Upload className="h-8 w-8 text-muted-foreground" />
                              <div className="text-center">
                                <p className="text-sm font-medium">Klik untuk mengunggah</p>
                                <p className="text-xs text-muted-foreground">
                                  Daftar hadir, foto kegiatan, atau dokumen pendukung lainnya (JPG, PNG, PDF, DOCX, XLSX)
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
                  onClick={() => navigate('/class-journal')}
                >
                  Batal
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="h-4 w-4 animate-spin" />
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Simpan Jurnal
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default ClassJournalCreatePage;
