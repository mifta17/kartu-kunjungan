import React, { useState, useEffect } from "react";
import app from "../config/Firebase";
import KartuKunjunganDataService from '../services/RegisterKartuKunjungan.service';
import MaterialTable from "material-table";
import { Container } from "@material-ui/core";


function Home() {
  const [dataList, setdataList] = useState();
  const localization = {
    header: {
      actions: 'Aksi',
    },
    body: {
      emptyDataSourceMessage: 'Tidak ada data untuk ditampilkan',
      addTooltip: 'Tambah Data',
      deleteTooltip: 'Hapus Data',
      editTooltip: 'Ubah Data',
      editRow: {
        deleteText: 'Apakah Anda yakin ingin menghapus data ini?',
        cancelTooltip: 'Batal',
        saveTooltip: 'Simpan',
      },
    },
    pagination: {
      labelDisplayedRows: '{from}-{to} dari {count}',
      labelRowsSelect: 'Baris',
      labelRowsPerPage: 'Baris Perhalaman',
      firstAriaLabel: 'Halaman Pertama',
      firstTooltip: 'Halaman Pertama',
      previousAriaLabel: 'Sebelumnya',
      previousTooltip: 'Sebelumnya',
      nextAriaLabel: 'Selanjutnya',
      nextTooltip: 'Selanjutnya',
      lastAriaLabel: 'Halaman Terakhir',
      lastTooltip: 'Halaman Terakhir',
    },
    toolbar: {
      addRemoveColumns: 'Tambah atau Hapus Kolom',
      nRowsSelected: '{0} baris dipilih',
      showColumnsAriaLabel: 'Tampilkan Kolom',
      showColumnsTitle: 'Tampilkan Kolom',
      searchAriaLabel: 'Cari',
      searchPlaceholder: 'Cari',
      searchTooltip: 'Cari'
    }
  };

  const columns = [
    { title: "Nama Kepala Keluarga", field: "namaKepalaKeluarga", initialEditValue: '' },
    { title: "Nomor Kartu Kunjungan", field: "noKartu", initialEditValue: '' },
    { title: "Alamat", field: "alamat", initialEditValue: '' }
  ];

  const options = {
    exportButton: true,
  };

  const editable = {
    onRowAdd: newData =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          const { namaKepalaKeluarga, noKartu, alamat } = newData
          KartuKunjunganDataService.create({
            namaKepalaKeluarga,
            noKartu,
            alamat
          })
          setdataList([...dataList, newData]);

          resolve();
        }, 1000)
      }),
    onRowUpdate: (newData, oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          const { namaKepalaKeluarga, noKartu, alamat } = newData
          KartuKunjunganDataService.update(oldData.id, {
            namaKepalaKeluarga,
            noKartu,
            alamat
          })
          const dataUpdate = [...dataList];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setdataList([...dataUpdate]);
          resolve();
        }, 1000)
      }),
    onRowDelete: oldData =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          KartuKunjunganDataService.delete(oldData.id)
          const dataDelete = [...dataList];
          const index = oldData.tableData.id;
          dataDelete.splice(index, 1);
          setdataList([...dataDelete]);
          resolve()
        }, 1000)
      }),
  };

  useEffect(() => {
    const dataRef = app.database().ref("KartuKunjungan");
    dataRef.on('value', (snapshot) => {
      if (snapshot.val() != null) {
        const dataList = []
        for (let id in snapshot.val()) {
          dataList.push({ id, ...snapshot.val()[id] })
        }
        setdataList(dataList);
      } else {
        setdataList([])
      }
    });
  }, []);

  return (
    <Container style={{ padding: "3rem 0" }} maxWidth="lg">
      <MaterialTable
        localization={localization}
        options={options}
        columns={columns}
        data={dataList}
        editable={editable}
        title={'Table Data'}
        row
      />
    </Container>
  )
}

export default Home;
