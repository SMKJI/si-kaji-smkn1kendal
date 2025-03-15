
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar as CalendarIcon, Search, User, Shield } from 'lucide-react';
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
import { format } from "date-fns";
import { id } from 'date-fns/locale';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { toast } from '@/components/ui/use-toast';

const disciplineRecordSchema = z.object({
  student: z.string().min(1, { message: "Pilih siswa" }),
  type: z.string().min(1, { message: "Pilih jenis pelanggaran" }),
  date: z.date({ required_error: "Pilih tanggal pelanggaran" }),
  points: z.number({ required_error: "Masukkan jumlah poin" })
    .min(1, { message: "Poin minimal 1" })
    .max(50, { message: "Poin maksimal 50" }),
  description: z.string().min(10, { message: "Deskripsi minimal 10 karakter" }),
  reportedBy: z.string().min(1, { message: "Pilih pelapor" }),
});

type DisciplineRecordFormValues = z.infer<typeof disciplineRecordSchema>;

const DisciplineRecordPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Catatan Pelanggaran - Si-Kaji';
  }, []);

  // Sample data for student selection
  const students = [
    { id: "1", name: "Andi Saputra", class: "XII RPL 1" },
    { id: "2", name: "Budi Santoso", class: "XI TKJ 2" },
    { id: "3", name: "Cindy Permata", class: "X MM 1" },
    { id: "4", name: "Dewi Kartika", class: "XII AKL 1" },
    { id: "5", name: "Eka Putra", class: "XI RPL 3" },
  ];

  // Sample data for teacher/reporter selection
  const teachers = [
    { id: "1", name: "Budi Santoso, S.Pd.", role: "Guru BK" },
    { id: "2", name: "Ani Suryani, S.Pd.", role: "Wali Kelas" },
    { id: "3", name: "Dedi Kurniawan, M.Pd.", role: "Guru Piket" },
    { id: "4", name: "Siti Rahayu, S.Pd.", role: "TPPK" },
  ];

  const form = useForm<DisciplineRecordFormValues>({
    resolver: zodResolver(disciplineRecordSchema),
    defaultValues: {
      student: "",
      type: "",
      date: new Date(),
      points: 5,
      description: "",
      reportedBy: "",
    },
  });

  function onSubmit(values: DisciplineRecordFormValues) {
    // Here we would typically save to API
    console.log(values);
    
    toast({
      title: "Pelanggaran berhasil dicatat",
      description: `Pelanggaran ${values.type} untuk siswa telah dicatat.`,
    });
    
    // Redirect back to discipline page
    setTimeout(() => {
      navigate('/discipline');
    }, 1500);
  }

  return (
    <DashboardLayout
      title="Catatan Pelanggaran"
      description="Pencatatan pelanggaran tata tertib sekolah"
      userRole="teacher"
      userName="Guru BK"
      showBackButton
      backTo="/discipline"
    >
      <Card>
        <CardHeader>
          <CardTitle>Formulir Pencatatan Pelanggaran</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="student"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Siswa</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={`justify-between ${!field.value && "text-muted-foreground"}`}
                            >
                              {field.value
                                ? students.find((student) => student.id === field.value)?.name
                                : "Pilih siswa"}
                              <User className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 w-[300px]">
                          <Command>
                            <CommandInput placeholder="Cari siswa..." />
                            <CommandEmpty>Siswa tidak ditemukan.</CommandEmpty>
                            <CommandGroup className="max-h-64 overflow-y-auto">
                              {students.map((student) => (
                                <CommandItem
                                  key={student.id}
                                  value={student.id}
                                  onSelect={() => {
                                    form.setValue("student", student.id);
                                  }}
                                >
                                  <div className="flex flex-col">
                                    <span>{student.name}</span>
                                    <span className="text-xs text-muted-foreground">{student.class}</span>
                                  </div>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jenis Pelanggaran</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih jenis pelanggaran" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Terlambat">Terlambat</SelectItem>
                          <SelectItem value="Seragam">Tidak Berseragam Lengkap</SelectItem>
                          <SelectItem value="Atribut">Tidak Memakai Atribut</SelectItem>
                          <SelectItem value="Rambut">Rambut Tidak Sesuai Aturan</SelectItem>
                          <SelectItem value="Kelas">Meninggalkan Kelas Tanpa Izin</SelectItem>
                          <SelectItem value="Gadget">Penggunaan Gadget di Kelas</SelectItem>
                          <SelectItem value="Lainnya">Pelanggaran Lainnya</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Tanggal Pelanggaran</FormLabel>
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
                            disabled={(date) =>
                              date > new Date() || date < new Date("2023-01-01")
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
                  name="points"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jumlah Poin</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min={1} 
                          max={50} 
                          {...field} 
                          onChange={e => field.onChange(parseInt(e.target.value) || 1)}
                        />
                      </FormControl>
                      <FormDescription>
                        Poin pelanggaran (1-50)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deskripsi Pelanggaran</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Masukkan deskripsi pelanggaran secara detail..."
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
                  name="reportedBy"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Dilaporkan Oleh</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={`justify-between ${!field.value && "text-muted-foreground"}`}
                            >
                              {field.value
                                ? teachers.find((teacher) => teacher.id === field.value)?.name
                                : "Pilih pelapor"}
                              <User className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 w-[300px]">
                          <Command>
                            <CommandInput placeholder="Cari pelapor..." />
                            <CommandEmpty>Pelapor tidak ditemukan.</CommandEmpty>
                            <CommandGroup className="max-h-64 overflow-y-auto">
                              {teachers.map((teacher) => (
                                <CommandItem
                                  key={teacher.id}
                                  value={teacher.id}
                                  onSelect={() => {
                                    form.setValue("reportedBy", teacher.id);
                                  }}
                                >
                                  <div className="flex flex-col">
                                    <span>{teacher.name}</span>
                                    <span className="text-xs text-muted-foreground">{teacher.role}</span>
                                  </div>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate('/discipline')}
                >
                  Batal
                </Button>
                <Button type="submit">Simpan Catatan</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default DisciplineRecordPage;
