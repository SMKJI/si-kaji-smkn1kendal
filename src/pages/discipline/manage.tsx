
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { DISCIPLINE_POINTS, USER_ROLES } from '@/lib/constants';
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
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { AlertTriangle, CheckCircle2, Medal, User } from 'lucide-react';

const disciplineFormSchema = z.object({
  studentId: z.string().min(1, { message: "Pilih siswa" }),
  violationType: z.enum(["minor", "medium", "major", "achievement"], {
    required_error: "Pilih jenis pelanggaran/prestasi",
  }),
  description: z.string().min(10, { message: "Deskripsi minimal 10 karakter" }),
  location: z.string().min(3, { message: "Lokasi minimal 3 karakter" }),
  dateTime: z.string().min(1, { message: "Pilih tanggal dan waktu" }),
  point: z.number().optional(),
  evidence: z.instanceof(FileList).optional(),
  notifyParent: z.boolean().default(true),
});

type DisciplineFormValues = z.infer<typeof disciplineFormSchema>;

const DisciplineManagePage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Mock students data
  const students = [
    { id: "S001", name: "Andi Saputra", class: "XII RPL 1" },
    { id: "S002", name: "Budi Santoso", class: "XII RPL 1" },
    { id: "S003", name: "Cindy Permata", class: "XII RPL 2" },
    { id: "S004", name: "Deni Wijaya", class: "XII RPL 2" },
    { id: "S005", name: "Eka Putri", class: "XII RPL 3" },
  ];

  const form = useForm<DisciplineFormValues>({
    resolver: zodResolver(disciplineFormSchema),
    defaultValues: {
      studentId: "",
      violationType: undefined,
      description: "",
      location: "",
      dateTime: new Date().toISOString().slice(0, 16),
      notifyParent: true,
    },
  });

  const violationType = form.watch("violationType");

  // Set point value based on violation type
  React.useEffect(() => {
    if (violationType) {
      let pointValue = 0;
      
      switch (violationType) {
        case "minor":
          pointValue = DISCIPLINE_POINTS.MINOR_VIOLATION;
          break;
        case "medium":
          pointValue = DISCIPLINE_POINTS.MEDIUM_VIOLATION;
          break;
        case "major":
          pointValue = DISCIPLINE_POINTS.MAJOR_VIOLATION;
          break;
        case "achievement":
          pointValue = DISCIPLINE_POINTS.ACHIEVEMENT;
          break;
      }
      
      form.setValue("point", pointValue);
    }
  }, [violationType, form]);

  function onSubmit(values: DisciplineFormValues) {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      
      const student = students.find(s => s.id === values.studentId);
      const isPositive = values.violationType === "achievement";
      
      toast({
        title: isPositive ? "Prestasi berhasil dicatat" : "Pelanggaran berhasil dicatat",
        description: `${isPositive ? "Prestasi" : "Pelanggaran"} untuk ${student?.name} telah dicatat dengan ${Math.abs(values.point || 0)} poin.`,
      });
      
      setIsSubmitting(false);
      
      // Redirect back to discipline page
      setTimeout(() => {
        navigate('/discipline');
      }, 1500);
    }, 1000);
  }

  return (
    <DashboardLayout
      title="Catat Pelanggaran/Prestasi"
      description="Pencatatan pelanggaran tata tertib dan prestasi siswa dengan sistem poin"
      userRole="tppk"
      userName="Tim TPPK"
      showBackButton
      backTo="/discipline"
    >
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Form Pencatatan</CardTitle>
          <CardDescription>
            Catat pelanggaran atau prestasi siswa untuk monitoring perkembangan disiplin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="studentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Siswa</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih siswa" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {students.map((student) => (
                            <SelectItem key={student.id} value={student.id}>
                              {student.name} - {student.class}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="violationType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kategori</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih jenis pencatatan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="minor">
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-yellow-500" />
                              <span>Pelanggaran Ringan (-5 poin)</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="medium">
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-orange-500" />
                              <span>Pelanggaran Sedang (-10 poin)</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="major">
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-red-500" />
                              <span>Pelanggaran Berat (-20 poin)</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="achievement">
                            <div className="flex items-center gap-2">
                              <Medal className="h-4 w-4 text-green-500" />
                              <span>Prestasi/Penghargaan (+15 poin)</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
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
                        <FormLabel>
                          {violationType === "achievement" ? "Deskripsi Prestasi" : "Deskripsi Pelanggaran"}
                        </FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={
                              violationType === "achievement" 
                                ? "Jelaskan prestasi yang diraih oleh siswa..." 
                                : "Jelaskan pelanggaran yang dilakukan oleh siswa..."
                            }
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
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lokasi</FormLabel>
                      <FormControl>
                        <Input placeholder="Ruang kelas, lapangan, dll." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="dateTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tanggal & Waktu</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="point"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Poin</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          readOnly
                          className={
                            violationType === "achievement" 
                              ? "text-green-600 font-medium" 
                              : "text-red-600 font-medium"
                          }
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription>
                        Poin otomatis dihitung berdasarkan kategori
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="evidence"
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                    <FormItem>
                      <FormLabel>Bukti (Opsional)</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={(e) => onChange(e.target.files)}
                          {...fieldProps}
                        />
                      </FormControl>
                      <FormDescription>
                        Upload foto, video, atau dokumen pendukung
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="notifyParent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-2 space-y-0 pt-4">
                      <FormControl>
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                      </FormControl>
                      <div className="space-y-0.5">
                        <FormLabel className="cursor-pointer">Beri notifikasi kepada orang tua</FormLabel>
                        <FormDescription>
                          Kirim notifikasi otomatis ke WhatsApp/email orang tua
                        </FormDescription>
                      </div>
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
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={
                    violationType === "achievement" 
                      ? "bg-green-600 hover:bg-green-700" 
                      : undefined
                  }
                >
                  {isSubmitting ? "Menyimpan..." : "Simpan Catatan"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default DisciplineManagePage;
