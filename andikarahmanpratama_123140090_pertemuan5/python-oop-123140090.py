from abc import ABC, abstractmethod

# =========================
# Abstract Class LibraryItem
# =========================
class LibraryItem(ABC):
    """
    Abstract class untuk item di perpustakaan
    """

    def __init__(self, item_id, title):
        self._item_id = item_id
        self._title = title

    @property
    def title(self):
        return self._title

    @property
    def item_id(self):
        return self._item_id

    @abstractmethod
    def display_info(self):
        pass


# =========================
# Subclass Book
# =========================
class Book(LibraryItem):
    def __init__(self, item_id, title, author):
        super().__init__(item_id, title)
        self.__author = author

    @property
    def author(self):
        return self.__author

    def display_info(self):
        print(f"Book ID: {self.item_id}, Title: '{self.title}', Author: {self.author}")


# =========================
# Subclass Magazine
# =========================
class Magazine(LibraryItem):
    def __init__(self, item_id, title, issue_number):
        super().__init__(item_id, title)
        self.__issue_number = issue_number

    @property
    def issue_number(self):
        return self.__issue_number

    def display_info(self):
        print(f"Magazine ID: {self.item_id}, Title: '{self.title}', Issue No: {self.issue_number}")


# =========================
# Class Library
# =========================
class Library:
    def __init__(self):
        self.__items = []

    def add_item(self, item):
        if isinstance(item, LibraryItem):
            self.__items.append(item)
            print(f"Item '{item.title}' berhasil ditambahkan.")
        else:
            print("Hanya item bertipe LibraryItem yang bisa ditambahkan!")

    def show_items(self):
        if not self.__items:
            print("Belum ada item di perpustakaan.")
            return
        print("\n=== Daftar Semua Item ===")
        for item in self.__items:
            item.display_info()

    def find_by_title(self, title):
        results = [item for item in self.__items if title.lower() in item.title.lower()]
        if results:
            for item in results:
                item.display_info()
        else:
            print(f"Tidak ada item dengan judul '{title}' ditemukan.")

    def find_by_id(self, item_id):
        results = [item for item in self.__items if item.item_id == item_id]
        if results:
            for item in results:
                item.display_info()
        else:
            print(f"Tidak ada item dengan ID '{item_id}' ditemukan.")


# =========================
# Menu Interaktif
# =========================
def main():
    library = Library()
    while True:
        print("\n=== Sistem Perpustakaan ===")
        print("1. Tambah Buku")
        print("2. Tambah Majalah")
        print("3. Tampilkan Semua Item")
        print("4. Cari Item Berdasarkan Judul")
        print("5. Cari Item Berdasarkan ID")
        print("6. Keluar")

        choice = input("Pilih menu (1-6): ")

        if choice == "1":
            item_id = int(input("Masukkan ID buku: "))
            title = input("Masukkan judul buku: ")
            author = input("Masukkan nama penulis: ")
            book = Book(item_id, title, author)
            library.add_item(book)

        elif choice == "2":
            item_id = int(input("Masukkan ID majalah: "))
            title = input("Masukkan judul majalah: ")
            issue = input("Masukkan nomor edisi: ")
            mag = Magazine(item_id, title, issue)
            library.add_item(mag)

        elif choice == "3":
            library.show_items()

        elif choice == "4":
            title = input("Masukkan judul untuk dicari: ")
            library.find_by_title(title)

        elif choice == "5":
            item_id = int(input("Masukkan ID untuk dicari: "))
            library.find_by_id(item_id)

        elif choice == "6":
            print("Terima kasih! Program selesai.")
            break

        else:
            print("Pilihan tidak valid. Silakan coba lagi.")

if __name__ == "__main__":
    main()
