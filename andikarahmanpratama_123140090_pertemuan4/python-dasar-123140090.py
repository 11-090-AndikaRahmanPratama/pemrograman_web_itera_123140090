# Program Pengelolaan Data Nilai Mahasiswa

# Data awal mahasiswa
mahasiswa_list = [
    {"nama": "Andika", "NIM": "123140090", "nilai_uts": 100, "nilai_uas": 100, "nilai_tugas": 100},
    {"nama": "Bambang", "NIM": "123140091", "nilai_uts": 70, "nilai_uas": 75, "nilai_tugas": 80},
    {"nama": "Bembeng", "NIM": "123140092", "nilai_uts": 60, "nilai_uas": 65, "nilai_tugas": 70},
    {"nama": "Bumbung", "NIM": "123140093", "nilai_uts": 50, "nilai_uas": 55, "nilai_tugas": 60},
    {"nama": "Bombong", "NIM": "123140094", "nilai_uts": 40, "nilai_uas": 45, "nilai_tugas": 50}
]

# Fungsi hitung nilai akhir
def hitung_nilai_akhir(nilai_uts, nilai_uas, nilai_tugas):
    return 0.3 * nilai_uts + 0.4 * nilai_uas + 0.3 * nilai_tugas

# Fungsi menentukan grade
def tentukan_grade(nilai_akhir):
    if nilai_akhir >= 80:
        return "A"
    elif nilai_akhir >= 70:
        return "B"
    elif nilai_akhir >= 60:
        return "C"
    elif nilai_akhir >= 50:
        return "D"
    else:
        return "E"

# Fungsi menampilkan data mahasiswa dalam tabel
def tampilkan_tabel(mahasiswa_list):
    print(f"{'NAMA':<10} {'NIM':<12} {'UTS':<5} {'UAS':<5} {'TUGAS':<6} {'AKHIR':<6} {'GRADE':<5}")
    print("-" * 55)
    for m in mahasiswa_list:
        nilai_akhir = hitung_nilai_akhir(m['nilai_uts'], m['nilai_uas'], m['nilai_tugas'])
        grade = tentukan_grade(nilai_akhir)
        print(f"{m['nama']:<10} {m['NIM']:<12} {m['nilai_uts']:<5} {m['nilai_uas']:<5} {m['nilai_tugas']:<6} {nilai_akhir:<6.2f} {grade:<5}")

# Fungsi mencari mahasiswa dengan nilai tertinggi
def mahasiswa_tertinggi(mahasiswa_list):
    max_nilai = -1
    mhs = None
    for m in mahasiswa_list:
        nilai_akhir = hitung_nilai_akhir(m['nilai_uts'], m['nilai_uas'], m['nilai_tugas'])
        if nilai_akhir > max_nilai:
            max_nilai = nilai_akhir
            mhs = m
    return mhs, max_nilai

# Fungsi mencari mahasiswa dengan nilai terendah
def mahasiswa_terendah(mahasiswa_list):
    min_nilai = 101
    mhs = None
    for m in mahasiswa_list:
        nilai_akhir = hitung_nilai_akhir(m['nilai_uts'], m['nilai_uas'], m['nilai_tugas'])
        if nilai_akhir < min_nilai:
            min_nilai = nilai_akhir
            mhs = m
    return mhs, min_nilai

# Fungsi menambahkan mahasiswa baru
def tambah_mahasiswa():
    nama = input("Nama mahasiswa: ")
    NIM = input("NIM mahasiswa: ")
    nilai_uts = float(input("Nilai UTS: "))
    nilai_uas = float(input("Nilai UAS: "))
    nilai_tugas = float(input("Nilai Tugas: "))
    mahasiswa_list.append({"nama": nama, "NIM": NIM, "nilai_uts": nilai_uts, "nilai_uas": nilai_uas, "nilai_tugas": nilai_tugas})
    print(f"Data mahasiswa {nama} berhasil ditambahkan!\n")

# Fungsi filter mahasiswa berdasarkan grade
def filter_grade(grade):
    filtered = []
    for m in mahasiswa_list:
        nilai_akhir = hitung_nilai_akhir(m['nilai_uts'], m['nilai_uas'], m['nilai_tugas'])
        if tentukan_grade(nilai_akhir) == grade:
            filtered.append(m)
    return filtered

# Fungsi menghitung rata-rata kelas
def rata_rata_kelas():
    total = 0
    for m in mahasiswa_list:
        total += hitung_nilai_akhir(m['nilai_uts'], m['nilai_uas'], m['nilai_tugas'])
    return total / len(mahasiswa_list)

# Menu program
def menu():
    while True:
        print("\n=== PROGRAM PENGELOLAAN DATA NILAI MAHASISWA ===")
        print("1. Tampilkan semua data mahasiswa")
        print("2. Tambah data mahasiswa baru")
        print("3. Cari mahasiswa dengan nilai tertinggi")
        print("4. Cari mahasiswa dengan nilai terendah")
        print("5. Filter mahasiswa berdasarkan grade")
        print("6. Hitung rata-rata nilai kelas")
        print("0. Keluar")
        pilihan = input("Pilihan Anda: ")
        
        if pilihan == "1":
            tampilkan_tabel(mahasiswa_list)
        elif pilihan == "2":
            tambah_mahasiswa()
        elif pilihan == "3":
            mhs, nilai = mahasiswa_tertinggi(mahasiswa_list)
            print(f"Mahasiswa dengan nilai tertinggi: {mhs['nama']} ({nilai:.2f})")
        elif pilihan == "4":
            mhs, nilai = mahasiswa_terendah(mahasiswa_list)
            print(f"Mahasiswa dengan nilai terendah: {mhs['nama']} ({nilai:.2f})")
        elif pilihan == "5":
            grade = input("Masukkan grade yang ingin difilter (A/B/C/D/E): ").upper()
            filtered = filter_grade(grade)
            if filtered:
                tampilkan_tabel(filtered)
            else:
                print(f"Tidak ada mahasiswa dengan grade {grade}")
        elif pilihan == "6":
            rata = rata_rata_kelas()
            print(f"Rata-rata nilai kelas: {rata:.2f}")
        elif pilihan == "0":
            print("Terima kasih!")
            break
        else:
            print("Pilihan tidak valid. Silakan coba lagi.")

# Jalankan program
menu()
