PGDMP      +                |            simkamp    16.3    16.3 �    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    65574    simkamp    DATABASE     ~   CREATE DATABASE simkamp WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Indonesia.1252';
    DROP DATABASE simkamp;
                zdn    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                pg_database_owner    false            �           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   pg_database_owner    false    4                       1255    114746    adjust_logistik_stok()    FUNCTION     ^  CREATE FUNCTION public.adjust_logistik_stok() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  current_stok INTEGER;
  logistik_nama VARCHAR(100);
BEGIN
  -- Dapatkan stok logistik saat ini dan nama atribut logistik
  SELECT logistik_stok, logistik_nama_atribut INTO current_stok, logistik_nama
  FROM logistik
  WHERE logistik_id = NEW.pemakaian_logistik_id;
  
  -- Periksa apakah stok logistik mencukupi untuk update
  IF current_stok + OLD.pemakaian_jumlah < NEW.pemakaian_jumlah THEN
    RAISE EXCEPTION 'Stok logistik % tidak mencukupi, jumlah logistik saat ini %', logistik_nama, current_stok;
  END IF;

  -- Sesuaikan stok logistik berdasarkan perubahan jumlah pemakaian
  UPDATE logistik
  SET logistik_stok = current_stok + OLD.pemakaian_jumlah - NEW.pemakaian_jumlah
  WHERE logistik_id = NEW.pemakaian_logistik_id;
  
  RETURN NEW;
END;
$$;
 -   DROP FUNCTION public.adjust_logistik_stok();
       public          zdn    false    4            �            1255    114745    restore_logistik_stok()    FUNCTION     K  CREATE FUNCTION public.restore_logistik_stok() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  -- Tambahkan kembali stok logistik berdasarkan jumlah pemakaian yang dihapus
  UPDATE logistik
  SET logistik_stok = logistik_stok + OLD.pemakaian_jumlah
  WHERE logistik_id = OLD.pemakaian_logistik_id;
  
  RETURN OLD;
END;
$$;
 .   DROP FUNCTION public.restore_logistik_stok();
       public          zdn    false    4            �            1255    106587    update_logistik_stok()    FUNCTION       CREATE FUNCTION public.update_logistik_stok() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  logistik_name TEXT;
  logistik_stock INT;
BEGIN
  -- Dapatkan nama atribut dan stok logistik
  SELECT logistik_nama_atribut, logistik_stok INTO logistik_name, logistik_stock
  FROM logistik
  WHERE logistik_id = NEW.pemakaian_logistik_id;

  -- Periksa apakah stok logistik mencukupi
  IF logistik_stock < NEW.pemakaian_jumlah THEN
    RAISE EXCEPTION 'Stok logistik tidak mencukupi untuk pemakaian % (Stok saat ini: %)', logistik_name, logistik_stock;
  END IF;

  -- Kurangi stok logistik berdasarkan jumlah pemakaian yang baru ditambahkan
  UPDATE logistik
  SET logistik_stok = logistik_stok - NEW.pemakaian_jumlah
  WHERE logistik_id = NEW.pemakaian_logistik_id;
  
  RETURN NEW;
END;
$$;
 -   DROP FUNCTION public.update_logistik_stok();
       public          zdn    false    4            �            1259    65690    agama    TABLE     _   CREATE TABLE public.agama (
    agama_id integer NOT NULL,
    agama character varying(255)
);
    DROP TABLE public.agama;
       public         heap    zdn    false    4            �            1259    65689    agama_agama_id_seq    SEQUENCE     �   CREATE SEQUENCE public.agama_agama_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.agama_agama_id_seq;
       public          zdn    false    224    4            �           0    0    agama_agama_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.agama_agama_id_seq OWNED BY public.agama.agama_id;
          public          zdn    false    223            �            1259    73861    arus_kas    TABLE     `  CREATE TABLE public.arus_kas (
    aruskas_id integer NOT NULL,
    aruskas_kategori character varying(255),
    aruskas_foto_kuitansi character varying(255),
    aruskas_detail character varying(255),
    aruskas_catatan character varying(255),
    aruskas_jumlah integer,
    aruskas_relawan_id integer,
    aruskas_tanggal character varying(255)
);
    DROP TABLE public.arus_kas;
       public         heap    zdn    false    4            �            1259    73860    arus_kas_aruskas_id_seq    SEQUENCE     �   CREATE SEQUENCE public.arus_kas_aruskas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.arus_kas_aruskas_id_seq;
       public          zdn    false    236    4            �           0    0    arus_kas_aruskas_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.arus_kas_aruskas_id_seq OWNED BY public.arus_kas.aruskas_id;
          public          zdn    false    235            �            1259    73845    calon_pemilih    TABLE     &  CREATE TABLE public.calon_pemilih (
    calon_pemilih_id integer NOT NULL,
    calon_pemilih_nama character varying(255),
    calon_pemilih_no_telp character varying(255),
    calon_pemilih_foto character varying(255),
    calon_pemilih_foto_ktp character varying(255),
    calon_pemilih_provinsi integer,
    calon_pemilih_kab_kota character varying(255),
    calon_pemilih_kecamatan character varying(255),
    calon_pemilih_kelurahan character varying(255),
    calon_pemilih_status character varying(255),
    calon_pemilih_relawan_id integer
);
 !   DROP TABLE public.calon_pemilih;
       public         heap    zdn    false    4            �            1259    73844 "   calon_pemilih_calon_pemilih_id_seq    SEQUENCE     �   CREATE SEQUENCE public.calon_pemilih_calon_pemilih_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.calon_pemilih_calon_pemilih_id_seq;
       public          zdn    false    234    4            �           0    0 "   calon_pemilih_calon_pemilih_id_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public.calon_pemilih_calon_pemilih_id_seq OWNED BY public.calon_pemilih.calon_pemilih_id;
          public          zdn    false    233            �            1259    65681    dapil    TABLE     �   CREATE TABLE public.dapil (
    dapil_id integer NOT NULL,
    dapil_nama character varying(255),
    dapil_provinsi integer
);
    DROP TABLE public.dapil;
       public         heap    zdn    false    4            �            1259    65680    dapil_dapil_id_seq    SEQUENCE     �   CREATE SEQUENCE public.dapil_dapil_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.dapil_dapil_id_seq;
       public          zdn    false    4    222            �           0    0    dapil_dapil_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.dapil_dapil_id_seq OWNED BY public.dapil.dapil_id;
          public          zdn    false    221            �            1259    65698    jenis_pemilihan    TABLE     }   CREATE TABLE public.jenis_pemilihan (
    jenis_pemilihan_id integer NOT NULL,
    jenis_pemilihan character varying(255)
);
 #   DROP TABLE public.jenis_pemilihan;
       public         heap    zdn    false    4            �            1259    65697 &   jenis_pemilihan_jenis_pemilihan_id_seq    SEQUENCE     �   CREATE SEQUENCE public.jenis_pemilihan_jenis_pemilihan_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 =   DROP SEQUENCE public.jenis_pemilihan_jenis_pemilihan_id_seq;
       public          zdn    false    4    226            �           0    0 &   jenis_pemilihan_jenis_pemilihan_id_seq    SEQUENCE OWNED BY     q   ALTER SEQUENCE public.jenis_pemilihan_jenis_pemilihan_id_seq OWNED BY public.jenis_pemilihan.jenis_pemilihan_id;
          public          zdn    false    225            �            1259    73767    kandidat    TABLE     �  CREATE TABLE public.kandidat (
    kandidat_id integer NOT NULL,
    kandidat_nama character varying(255),
    kandidat_email character varying(255),
    kandidat_password character varying(255),
    kandidat_no_telp character varying(50),
    kandidat_agama_id integer,
    kandidat_foto character varying(255),
    kandidat_usia character varying(255),
    kandidat_partai_id integer,
    kandidat_alamat character varying(255),
    kandidat_admin_id integer,
    kandidat_dapil_id integer,
    kandidat_jenis_pemilihan_id integer,
    kandidat_posisi_calon_tetap_id integer,
    kandidat_jenis_kelamin character varying(255),
    kandidat_role_id integer,
    kandidat_nomor_urut integer
);
    DROP TABLE public.kandidat;
       public         heap    zdn    false    4            �            1259    73766    kandidat_kandidat_id_seq    SEQUENCE     �   CREATE SEQUENCE public.kandidat_kandidat_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.kandidat_kandidat_id_seq;
       public          zdn    false    230    4            �           0    0    kandidat_kandidat_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.kandidat_kandidat_id_seq OWNED BY public.kandidat.kandidat_id;
          public          zdn    false    229            �            1259    73875    logistik    TABLE       CREATE TABLE public.logistik (
    logistik_id integer NOT NULL,
    logistik_nama_atribut character varying(255),
    logistik_satuan_unit character varying(255),
    logistik_stok integer,
    logistik_total_harga character varying(255),
    logistik_relawan_id integer
);
    DROP TABLE public.logistik;
       public         heap    zdn    false    4            �            1259    73874    logistik_logistik_id_seq    SEQUENCE     �   CREATE SEQUENCE public.logistik_logistik_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.logistik_logistik_id_seq;
       public          zdn    false    4    238            �           0    0    logistik_logistik_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.logistik_logistik_id_seq OWNED BY public.logistik.logistik_id;
          public          zdn    false    237            �            1259    65626    partai    TABLE     �   CREATE TABLE public.partai (
    partai_id integer NOT NULL,
    partai_label character varying(255),
    partai_nama character varying(255),
    partai_nomor character varying(255),
    partai_logo character varying(255)
);
    DROP TABLE public.partai;
       public         heap    zdn    false    4            �            1259    65625    partai_partai_id_seq    SEQUENCE     �   CREATE SEQUENCE public.partai_partai_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.partai_partai_id_seq;
       public          zdn    false    4    218            �           0    0    partai_partai_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.partai_partai_id_seq OWNED BY public.partai.partai_id;
          public          zdn    false    217            �            1259    73906    pemakaian_logistik    TABLE     �   CREATE TABLE public.pemakaian_logistik (
    pemakaian_id integer NOT NULL,
    pemakaian_tanggal character varying(255),
    pemakaian_jumlah integer,
    pemakaian_logistik_id integer,
    pemakaian_relawan_id integer
);
 &   DROP TABLE public.pemakaian_logistik;
       public         heap    zdn    false    4            �            1259    73905 #   pemakaian_logistik_pemakaian_id_seq    SEQUENCE     �   CREATE SEQUENCE public.pemakaian_logistik_pemakaian_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 :   DROP SEQUENCE public.pemakaian_logistik_pemakaian_id_seq;
       public          zdn    false    240    4            �           0    0 #   pemakaian_logistik_pemakaian_id_seq    SEQUENCE OWNED BY     k   ALTER SEQUENCE public.pemakaian_logistik_pemakaian_id_seq OWNED BY public.pemakaian_logistik.pemakaian_id;
          public          zdn    false    239            �            1259    65705    posisi_calon_tetap    TABLE     �   CREATE TABLE public.posisi_calon_tetap (
    posisi_calon_tetap_id integer NOT NULL,
    posisi_calon_tetap character varying(255)
);
 &   DROP TABLE public.posisi_calon_tetap;
       public         heap    zdn    false    4            �            1259    65704 &   posisis_calon_tetap_calon_tetap_id_seq    SEQUENCE     �   CREATE SEQUENCE public.posisis_calon_tetap_calon_tetap_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 =   DROP SEQUENCE public.posisis_calon_tetap_calon_tetap_id_seq;
       public          zdn    false    4    228            �           0    0 &   posisis_calon_tetap_calon_tetap_id_seq    SEQUENCE OWNED BY     w   ALTER SEQUENCE public.posisis_calon_tetap_calon_tetap_id_seq OWNED BY public.posisi_calon_tetap.posisi_calon_tetap_id;
          public          zdn    false    227            �            1259    114727    quick_count    TABLE     �  CREATE TABLE public.quick_count (
    quick_count_id integer NOT NULL,
    quick_count_provinsi integer,
    quick_count_kab_kota character varying(255),
    quick_count_kecamatan character varying(255),
    quick_count_kelurahan character varying(255),
    quick_count_jumlah_suara integer,
    quick_count_relawan_id integer,
    quick_count_foto character varying(255),
    quick_count_tps character varying(255)
);
    DROP TABLE public.quick_count;
       public         heap    zdn    false    4            �            1259    114726    quick_count_quick_count_id_seq    SEQUENCE     �   CREATE SEQUENCE public.quick_count_quick_count_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.quick_count_quick_count_id_seq;
       public          zdn    false    244    4            �           0    0    quick_count_quick_count_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.quick_count_quick_count_id_seq OWNED BY public.quick_count.quick_count_id;
          public          zdn    false    243            �            1259    73810    relawan    TABLE        CREATE TABLE public.relawan (
    relawan_id integer NOT NULL,
    relawan_nama character varying(255),
    relawan_email character varying(255),
    relawan_password character varying(255),
    relawan_no_telp character varying(255),
    relawan_usia integer,
    relawan_jenis_kelamin character varying(255),
    relawan_foto character varying(255),
    relawan_provinsi_kode integer,
    relawan_kab_kota_kode character varying(255),
    relawan_status character varying(255),
    relawan_kandidat_id integer,
    relawan_role_id integer
);
    DROP TABLE public.relawan;
       public         heap    zdn    false    4            �            1259    73809    relawan_relawan_id_seq    SEQUENCE     �   CREATE SEQUENCE public.relawan_relawan_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.relawan_relawan_id_seq;
       public          zdn    false    232    4            �           0    0    relawan_relawan_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.relawan_relawan_id_seq OWNED BY public.relawan.relawan_id;
          public          zdn    false    231            �            1259    65587    roles    TABLE     �   CREATE TABLE public.roles (
    role_id integer NOT NULL,
    role character varying(255),
    role_deskripsi character varying(255)
);
    DROP TABLE public.roles;
       public         heap    zdn    false    4            �            1259    65586    roles_role_id_seq    SEQUENCE     �   CREATE SEQUENCE public.roles_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.roles_role_id_seq;
       public          zdn    false    4    216            �           0    0    roles_role_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.roles_role_id_seq OWNED BY public.roles.role_id;
          public          zdn    false    215            �            1259    90151    token_blacklist    TABLE     �   CREATE TABLE public.token_blacklist (
    id integer NOT NULL,
    token text NOT NULL,
    expiry timestamp without time zone NOT NULL
);
 #   DROP TABLE public.token_blacklist;
       public         heap    zdn    false    4            �            1259    90150    token_blacklist_id_seq    SEQUENCE     �   CREATE SEQUENCE public.token_blacklist_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.token_blacklist_id_seq;
       public          zdn    false    4    242            �           0    0    token_blacklist_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.token_blacklist_id_seq OWNED BY public.token_blacklist.id;
          public          zdn    false    241            �            1259    65660    users    TABLE       CREATE TABLE public.users (
    user_id integer NOT NULL,
    user_nama character varying(255),
    user_email character varying(255),
    user_password character varying(255),
    user_no_telp character varying(255),
    user_partai_id integer,
    user_role_id integer
);
    DROP TABLE public.users;
       public         heap    zdn    false    4            �            1259    65659    users_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.users_user_id_seq;
       public          zdn    false    220    4            �           0    0    users_user_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;
          public          zdn    false    219            �           2604    65693    agama agama_id    DEFAULT     p   ALTER TABLE ONLY public.agama ALTER COLUMN agama_id SET DEFAULT nextval('public.agama_agama_id_seq'::regclass);
 =   ALTER TABLE public.agama ALTER COLUMN agama_id DROP DEFAULT;
       public          zdn    false    224    223    224            �           2604    73864    arus_kas aruskas_id    DEFAULT     z   ALTER TABLE ONLY public.arus_kas ALTER COLUMN aruskas_id SET DEFAULT nextval('public.arus_kas_aruskas_id_seq'::regclass);
 B   ALTER TABLE public.arus_kas ALTER COLUMN aruskas_id DROP DEFAULT;
       public          zdn    false    236    235    236            �           2604    73848    calon_pemilih calon_pemilih_id    DEFAULT     �   ALTER TABLE ONLY public.calon_pemilih ALTER COLUMN calon_pemilih_id SET DEFAULT nextval('public.calon_pemilih_calon_pemilih_id_seq'::regclass);
 M   ALTER TABLE public.calon_pemilih ALTER COLUMN calon_pemilih_id DROP DEFAULT;
       public          zdn    false    233    234    234            �           2604    65684    dapil dapil_id    DEFAULT     p   ALTER TABLE ONLY public.dapil ALTER COLUMN dapil_id SET DEFAULT nextval('public.dapil_dapil_id_seq'::regclass);
 =   ALTER TABLE public.dapil ALTER COLUMN dapil_id DROP DEFAULT;
       public          zdn    false    221    222    222            �           2604    65701 "   jenis_pemilihan jenis_pemilihan_id    DEFAULT     �   ALTER TABLE ONLY public.jenis_pemilihan ALTER COLUMN jenis_pemilihan_id SET DEFAULT nextval('public.jenis_pemilihan_jenis_pemilihan_id_seq'::regclass);
 Q   ALTER TABLE public.jenis_pemilihan ALTER COLUMN jenis_pemilihan_id DROP DEFAULT;
       public          zdn    false    226    225    226            �           2604    73770    kandidat kandidat_id    DEFAULT     |   ALTER TABLE ONLY public.kandidat ALTER COLUMN kandidat_id SET DEFAULT nextval('public.kandidat_kandidat_id_seq'::regclass);
 C   ALTER TABLE public.kandidat ALTER COLUMN kandidat_id DROP DEFAULT;
       public          zdn    false    229    230    230            �           2604    73878    logistik logistik_id    DEFAULT     |   ALTER TABLE ONLY public.logistik ALTER COLUMN logistik_id SET DEFAULT nextval('public.logistik_logistik_id_seq'::regclass);
 C   ALTER TABLE public.logistik ALTER COLUMN logistik_id DROP DEFAULT;
       public          zdn    false    237    238    238            �           2604    65629    partai partai_id    DEFAULT     t   ALTER TABLE ONLY public.partai ALTER COLUMN partai_id SET DEFAULT nextval('public.partai_partai_id_seq'::regclass);
 ?   ALTER TABLE public.partai ALTER COLUMN partai_id DROP DEFAULT;
       public          zdn    false    218    217    218            �           2604    73909    pemakaian_logistik pemakaian_id    DEFAULT     �   ALTER TABLE ONLY public.pemakaian_logistik ALTER COLUMN pemakaian_id SET DEFAULT nextval('public.pemakaian_logistik_pemakaian_id_seq'::regclass);
 N   ALTER TABLE public.pemakaian_logistik ALTER COLUMN pemakaian_id DROP DEFAULT;
       public          zdn    false    239    240    240            �           2604    65708 (   posisi_calon_tetap posisi_calon_tetap_id    DEFAULT     �   ALTER TABLE ONLY public.posisi_calon_tetap ALTER COLUMN posisi_calon_tetap_id SET DEFAULT nextval('public.posisis_calon_tetap_calon_tetap_id_seq'::regclass);
 W   ALTER TABLE public.posisi_calon_tetap ALTER COLUMN posisi_calon_tetap_id DROP DEFAULT;
       public          zdn    false    227    228    228            �           2604    114730    quick_count quick_count_id    DEFAULT     �   ALTER TABLE ONLY public.quick_count ALTER COLUMN quick_count_id SET DEFAULT nextval('public.quick_count_quick_count_id_seq'::regclass);
 I   ALTER TABLE public.quick_count ALTER COLUMN quick_count_id DROP DEFAULT;
       public          zdn    false    244    243    244            �           2604    73813    relawan relawan_id    DEFAULT     x   ALTER TABLE ONLY public.relawan ALTER COLUMN relawan_id SET DEFAULT nextval('public.relawan_relawan_id_seq'::regclass);
 A   ALTER TABLE public.relawan ALTER COLUMN relawan_id DROP DEFAULT;
       public          zdn    false    231    232    232            �           2604    65590    roles role_id    DEFAULT     n   ALTER TABLE ONLY public.roles ALTER COLUMN role_id SET DEFAULT nextval('public.roles_role_id_seq'::regclass);
 <   ALTER TABLE public.roles ALTER COLUMN role_id DROP DEFAULT;
       public          zdn    false    215    216    216            �           2604    90154    token_blacklist id    DEFAULT     x   ALTER TABLE ONLY public.token_blacklist ALTER COLUMN id SET DEFAULT nextval('public.token_blacklist_id_seq'::regclass);
 A   ALTER TABLE public.token_blacklist ALTER COLUMN id DROP DEFAULT;
       public          zdn    false    241    242    242            �           2604    65663    users user_id    DEFAULT     n   ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);
 <   ALTER TABLE public.users ALTER COLUMN user_id DROP DEFAULT;
       public          zdn    false    219    220    220            �          0    65690    agama 
   TABLE DATA           0   COPY public.agama (agama_id, agama) FROM stdin;
    public          zdn    false    224   9�       �          0    73861    arus_kas 
   TABLE DATA           �   COPY public.arus_kas (aruskas_id, aruskas_kategori, aruskas_foto_kuitansi, aruskas_detail, aruskas_catatan, aruskas_jumlah, aruskas_relawan_id, aruskas_tanggal) FROM stdin;
    public          zdn    false    236   f�       �          0    73845    calon_pemilih 
   TABLE DATA           "  COPY public.calon_pemilih (calon_pemilih_id, calon_pemilih_nama, calon_pemilih_no_telp, calon_pemilih_foto, calon_pemilih_foto_ktp, calon_pemilih_provinsi, calon_pemilih_kab_kota, calon_pemilih_kecamatan, calon_pemilih_kelurahan, calon_pemilih_status, calon_pemilih_relawan_id) FROM stdin;
    public          zdn    false    234   A�       ~          0    65681    dapil 
   TABLE DATA           E   COPY public.dapil (dapil_id, dapil_nama, dapil_provinsi) FROM stdin;
    public          zdn    false    222   ��       �          0    65698    jenis_pemilihan 
   TABLE DATA           N   COPY public.jenis_pemilihan (jenis_pemilihan_id, jenis_pemilihan) FROM stdin;
    public          zdn    false    226   6�       �          0    73767    kandidat 
   TABLE DATA           k  COPY public.kandidat (kandidat_id, kandidat_nama, kandidat_email, kandidat_password, kandidat_no_telp, kandidat_agama_id, kandidat_foto, kandidat_usia, kandidat_partai_id, kandidat_alamat, kandidat_admin_id, kandidat_dapil_id, kandidat_jenis_pemilihan_id, kandidat_posisi_calon_tetap_id, kandidat_jenis_kelamin, kandidat_role_id, kandidat_nomor_urut) FROM stdin;
    public          zdn    false    230   b�       �          0    73875    logistik 
   TABLE DATA           �   COPY public.logistik (logistik_id, logistik_nama_atribut, logistik_satuan_unit, logistik_stok, logistik_total_harga, logistik_relawan_id) FROM stdin;
    public          zdn    false    238   N�       z          0    65626    partai 
   TABLE DATA           a   COPY public.partai (partai_id, partai_label, partai_nama, partai_nomor, partai_logo) FROM stdin;
    public          zdn    false    218   ��       �          0    73906    pemakaian_logistik 
   TABLE DATA           �   COPY public.pemakaian_logistik (pemakaian_id, pemakaian_tanggal, pemakaian_jumlah, pemakaian_logistik_id, pemakaian_relawan_id) FROM stdin;
    public          zdn    false    240   ��       �          0    65705    posisi_calon_tetap 
   TABLE DATA           W   COPY public.posisi_calon_tetap (posisi_calon_tetap_id, posisi_calon_tetap) FROM stdin;
    public          zdn    false    228   ��       �          0    114727    quick_count 
   TABLE DATA           �   COPY public.quick_count (quick_count_id, quick_count_provinsi, quick_count_kab_kota, quick_count_kecamatan, quick_count_kelurahan, quick_count_jumlah_suara, quick_count_relawan_id, quick_count_foto, quick_count_tps) FROM stdin;
    public          zdn    false    244   �       �          0    73810    relawan 
   TABLE DATA             COPY public.relawan (relawan_id, relawan_nama, relawan_email, relawan_password, relawan_no_telp, relawan_usia, relawan_jenis_kelamin, relawan_foto, relawan_provinsi_kode, relawan_kab_kota_kode, relawan_status, relawan_kandidat_id, relawan_role_id) FROM stdin;
    public          zdn    false    232   ��       x          0    65587    roles 
   TABLE DATA           >   COPY public.roles (role_id, role, role_deskripsi) FROM stdin;
    public          zdn    false    216   ��       �          0    90151    token_blacklist 
   TABLE DATA           <   COPY public.token_blacklist (id, token, expiry) FROM stdin;
    public          zdn    false    242   �       |          0    65660    users 
   TABLE DATA           z   COPY public.users (user_id, user_nama, user_email, user_password, user_no_telp, user_partai_id, user_role_id) FROM stdin;
    public          zdn    false    220   z�       �           0    0    agama_agama_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.agama_agama_id_seq', 4, true);
          public          zdn    false    223            �           0    0    arus_kas_aruskas_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.arus_kas_aruskas_id_seq', 5, true);
          public          zdn    false    235            �           0    0 "   calon_pemilih_calon_pemilih_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.calon_pemilih_calon_pemilih_id_seq', 5, true);
          public          zdn    false    233            �           0    0    dapil_dapil_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.dapil_dapil_id_seq', 3, true);
          public          zdn    false    221            �           0    0 &   jenis_pemilihan_jenis_pemilihan_id_seq    SEQUENCE SET     T   SELECT pg_catalog.setval('public.jenis_pemilihan_jenis_pemilihan_id_seq', 4, true);
          public          zdn    false    225            �           0    0    kandidat_kandidat_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.kandidat_kandidat_id_seq', 9, true);
          public          zdn    false    229            �           0    0    logistik_logistik_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.logistik_logistik_id_seq', 7, true);
          public          zdn    false    237            �           0    0    partai_partai_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.partai_partai_id_seq', 13, true);
          public          zdn    false    217            �           0    0 #   pemakaian_logistik_pemakaian_id_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public.pemakaian_logistik_pemakaian_id_seq', 11, true);
          public          zdn    false    239            �           0    0 &   posisis_calon_tetap_calon_tetap_id_seq    SEQUENCE SET     T   SELECT pg_catalog.setval('public.posisis_calon_tetap_calon_tetap_id_seq', 4, true);
          public          zdn    false    227            �           0    0    quick_count_quick_count_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.quick_count_quick_count_id_seq', 4, true);
          public          zdn    false    243            �           0    0    relawan_relawan_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.relawan_relawan_id_seq', 11, true);
          public          zdn    false    231            �           0    0    roles_role_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.roles_role_id_seq', 8, true);
          public          zdn    false    215            �           0    0    token_blacklist_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.token_blacklist_id_seq', 132, true);
          public          zdn    false    241            �           0    0    users_user_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.users_user_id_seq', 8, true);
          public          zdn    false    219            �           2606    65695    agama agama_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.agama
    ADD CONSTRAINT agama_pkey PRIMARY KEY (agama_id);
 :   ALTER TABLE ONLY public.agama DROP CONSTRAINT agama_pkey;
       public            zdn    false    224            �           2606    73868    arus_kas arus_kas_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.arus_kas
    ADD CONSTRAINT arus_kas_pkey PRIMARY KEY (aruskas_id);
 @   ALTER TABLE ONLY public.arus_kas DROP CONSTRAINT arus_kas_pkey;
       public            zdn    false    236            �           2606    73854 5   calon_pemilih calon_pemilih_calon_pemilih_no_telp_key 
   CONSTRAINT     �   ALTER TABLE ONLY public.calon_pemilih
    ADD CONSTRAINT calon_pemilih_calon_pemilih_no_telp_key UNIQUE (calon_pemilih_no_telp);
 _   ALTER TABLE ONLY public.calon_pemilih DROP CONSTRAINT calon_pemilih_calon_pemilih_no_telp_key;
       public            zdn    false    234            �           2606    73852     calon_pemilih calon_pemilih_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.calon_pemilih
    ADD CONSTRAINT calon_pemilih_pkey PRIMARY KEY (calon_pemilih_id);
 J   ALTER TABLE ONLY public.calon_pemilih DROP CONSTRAINT calon_pemilih_pkey;
       public            zdn    false    234            �           2606    65688    dapil dapil_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.dapil
    ADD CONSTRAINT dapil_pkey PRIMARY KEY (dapil_id);
 :   ALTER TABLE ONLY public.dapil DROP CONSTRAINT dapil_pkey;
       public            zdn    false    222            �           2606    65703 $   jenis_pemilihan jenis_pemilihan_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.jenis_pemilihan
    ADD CONSTRAINT jenis_pemilihan_pkey PRIMARY KEY (jenis_pemilihan_id);
 N   ALTER TABLE ONLY public.jenis_pemilihan DROP CONSTRAINT jenis_pemilihan_pkey;
       public            zdn    false    226            �           2606    73776 $   kandidat kandidat_kandidat_email_key 
   CONSTRAINT     i   ALTER TABLE ONLY public.kandidat
    ADD CONSTRAINT kandidat_kandidat_email_key UNIQUE (kandidat_email);
 N   ALTER TABLE ONLY public.kandidat DROP CONSTRAINT kandidat_kandidat_email_key;
       public            zdn    false    230            �           2606    73778 &   kandidat kandidat_kandidat_no_telp_key 
   CONSTRAINT     m   ALTER TABLE ONLY public.kandidat
    ADD CONSTRAINT kandidat_kandidat_no_telp_key UNIQUE (kandidat_no_telp);
 P   ALTER TABLE ONLY public.kandidat DROP CONSTRAINT kandidat_kandidat_no_telp_key;
       public            zdn    false    230            �           2606    73774    kandidat kandidat_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.kandidat
    ADD CONSTRAINT kandidat_pkey PRIMARY KEY (kandidat_id);
 @   ALTER TABLE ONLY public.kandidat DROP CONSTRAINT kandidat_pkey;
       public            zdn    false    230            �           2606    73882    logistik logistik_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.logistik
    ADD CONSTRAINT logistik_pkey PRIMARY KEY (logistik_id);
 @   ALTER TABLE ONLY public.logistik DROP CONSTRAINT logistik_pkey;
       public            zdn    false    238            �           2606    65633    partai partai_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.partai
    ADD CONSTRAINT partai_pkey PRIMARY KEY (partai_id);
 <   ALTER TABLE ONLY public.partai DROP CONSTRAINT partai_pkey;
       public            zdn    false    218            �           2606    73911 *   pemakaian_logistik pemakaian_logistik_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.pemakaian_logistik
    ADD CONSTRAINT pemakaian_logistik_pkey PRIMARY KEY (pemakaian_id);
 T   ALTER TABLE ONLY public.pemakaian_logistik DROP CONSTRAINT pemakaian_logistik_pkey;
       public            zdn    false    240            �           2606    65710 +   posisi_calon_tetap posisis_calon_tetap_pkey 
   CONSTRAINT     |   ALTER TABLE ONLY public.posisi_calon_tetap
    ADD CONSTRAINT posisis_calon_tetap_pkey PRIMARY KEY (posisi_calon_tetap_id);
 U   ALTER TABLE ONLY public.posisi_calon_tetap DROP CONSTRAINT posisis_calon_tetap_pkey;
       public            zdn    false    228            �           2606    114732    quick_count quick_count_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.quick_count
    ADD CONSTRAINT quick_count_pkey PRIMARY KEY (quick_count_id);
 F   ALTER TABLE ONLY public.quick_count DROP CONSTRAINT quick_count_pkey;
       public            zdn    false    244            �           2606    73817    relawan relawan_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.relawan
    ADD CONSTRAINT relawan_pkey PRIMARY KEY (relawan_id);
 >   ALTER TABLE ONLY public.relawan DROP CONSTRAINT relawan_pkey;
       public            zdn    false    232            �           2606    73819 !   relawan relawan_relawan_email_key 
   CONSTRAINT     e   ALTER TABLE ONLY public.relawan
    ADD CONSTRAINT relawan_relawan_email_key UNIQUE (relawan_email);
 K   ALTER TABLE ONLY public.relawan DROP CONSTRAINT relawan_relawan_email_key;
       public            zdn    false    232            �           2606    73821 #   relawan relawan_relawan_no_telp_key 
   CONSTRAINT     i   ALTER TABLE ONLY public.relawan
    ADD CONSTRAINT relawan_relawan_no_telp_key UNIQUE (relawan_no_telp);
 M   ALTER TABLE ONLY public.relawan DROP CONSTRAINT relawan_relawan_no_telp_key;
       public            zdn    false    232            �           2606    65594    roles roles_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (role_id);
 :   ALTER TABLE ONLY public.roles DROP CONSTRAINT roles_pkey;
       public            zdn    false    216            �           2606    90158 $   token_blacklist token_blacklist_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.token_blacklist
    ADD CONSTRAINT token_blacklist_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.token_blacklist DROP CONSTRAINT token_blacklist_pkey;
       public            zdn    false    242            �           2606    90160 )   token_blacklist token_blacklist_token_key 
   CONSTRAINT     e   ALTER TABLE ONLY public.token_blacklist
    ADD CONSTRAINT token_blacklist_token_key UNIQUE (token);
 S   ALTER TABLE ONLY public.token_blacklist DROP CONSTRAINT token_blacklist_token_key;
       public            zdn    false    242            �           2606    65667    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            zdn    false    220            �           2606    65669    users users_user_email_key 
   CONSTRAINT     [   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_user_email_key UNIQUE (user_email);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_user_email_key;
       public            zdn    false    220            �           2620    114748 +   pemakaian_logistik trg_adjust_logistik_stok    TRIGGER     �   CREATE TRIGGER trg_adjust_logistik_stok AFTER UPDATE ON public.pemakaian_logistik FOR EACH ROW EXECUTE FUNCTION public.adjust_logistik_stok();
 D   DROP TRIGGER trg_adjust_logistik_stok ON public.pemakaian_logistik;
       public          zdn    false    258    240            �           2620    114747 ,   pemakaian_logistik trg_restore_logistik_stok    TRIGGER     �   CREATE TRIGGER trg_restore_logistik_stok AFTER DELETE ON public.pemakaian_logistik FOR EACH ROW EXECUTE FUNCTION public.restore_logistik_stok();
 E   DROP TRIGGER trg_restore_logistik_stok ON public.pemakaian_logistik;
       public          zdn    false    246    240            �           2620    106588 +   pemakaian_logistik trg_update_logistik_stok    TRIGGER     �   CREATE TRIGGER trg_update_logistik_stok AFTER INSERT ON public.pemakaian_logistik FOR EACH ROW EXECUTE FUNCTION public.update_logistik_stok();
 D   DROP TRIGGER trg_update_logistik_stok ON public.pemakaian_logistik;
       public          zdn    false    240    245            �           2606    73869 )   arus_kas arus_kas_aruskas_relawan_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.arus_kas
    ADD CONSTRAINT arus_kas_aruskas_relawan_id_fkey FOREIGN KEY (aruskas_relawan_id) REFERENCES public.relawan(relawan_id);
 S   ALTER TABLE ONLY public.arus_kas DROP CONSTRAINT arus_kas_aruskas_relawan_id_fkey;
       public          zdn    false    4799    232    236            �           2606    73855 9   calon_pemilih calon_pemilih_calon_pemilih_relawan_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.calon_pemilih
    ADD CONSTRAINT calon_pemilih_calon_pemilih_relawan_id_fkey FOREIGN KEY (calon_pemilih_relawan_id) REFERENCES public.relawan(relawan_id);
 c   ALTER TABLE ONLY public.calon_pemilih DROP CONSTRAINT calon_pemilih_calon_pemilih_relawan_id_fkey;
       public          zdn    false    232    234    4799            �           2606    73789 (   kandidat kandidat_kandidat_admin_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.kandidat
    ADD CONSTRAINT kandidat_kandidat_admin_id_fkey FOREIGN KEY (kandidat_admin_id) REFERENCES public.users(user_id);
 R   ALTER TABLE ONLY public.kandidat DROP CONSTRAINT kandidat_kandidat_admin_id_fkey;
       public          zdn    false    230    4781    220            �           2606    73779 %   kandidat kandidat_kandidat_agama_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.kandidat
    ADD CONSTRAINT kandidat_kandidat_agama_fkey FOREIGN KEY (kandidat_agama_id) REFERENCES public.agama(agama_id);
 O   ALTER TABLE ONLY public.kandidat DROP CONSTRAINT kandidat_kandidat_agama_fkey;
       public          zdn    false    224    4787    230            �           2606    73794 %   kandidat kandidat_kandidat_dapil_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.kandidat
    ADD CONSTRAINT kandidat_kandidat_dapil_fkey FOREIGN KEY (kandidat_dapil_id) REFERENCES public.dapil(dapil_id);
 O   ALTER TABLE ONLY public.kandidat DROP CONSTRAINT kandidat_kandidat_dapil_fkey;
       public          zdn    false    230    4785    222            �           2606    73799 /   kandidat kandidat_kandidat_jenis_pemilihan_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.kandidat
    ADD CONSTRAINT kandidat_kandidat_jenis_pemilihan_fkey FOREIGN KEY (kandidat_jenis_pemilihan_id) REFERENCES public.jenis_pemilihan(jenis_pemilihan_id);
 Y   ALTER TABLE ONLY public.kandidat DROP CONSTRAINT kandidat_kandidat_jenis_pemilihan_fkey;
       public          zdn    false    230    226    4789            �           2606    73784 &   kandidat kandidat_kandidat_partai_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.kandidat
    ADD CONSTRAINT kandidat_kandidat_partai_fkey FOREIGN KEY (kandidat_partai_id) REFERENCES public.partai(partai_id);
 P   ALTER TABLE ONLY public.kandidat DROP CONSTRAINT kandidat_kandidat_partai_fkey;
       public          zdn    false    218    4779    230            �           2606    73804 2   kandidat kandidat_kandidat_posisi_calon_tetap_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.kandidat
    ADD CONSTRAINT kandidat_kandidat_posisi_calon_tetap_fkey FOREIGN KEY (kandidat_posisi_calon_tetap_id) REFERENCES public.posisi_calon_tetap(posisi_calon_tetap_id);
 \   ALTER TABLE ONLY public.kandidat DROP CONSTRAINT kandidat_kandidat_posisi_calon_tetap_fkey;
       public          zdn    false    230    228    4791            �           2606    81958 $   kandidat kandidat_kandidat_role_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.kandidat
    ADD CONSTRAINT kandidat_kandidat_role_fkey FOREIGN KEY (kandidat_role_id) REFERENCES public.roles(role_id);
 N   ALTER TABLE ONLY public.kandidat DROP CONSTRAINT kandidat_kandidat_role_fkey;
       public          zdn    false    216    4777    230            �           2606    73883 *   logistik logistik_logistik_relawan_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.logistik
    ADD CONSTRAINT logistik_logistik_relawan_id_fkey FOREIGN KEY (logistik_relawan_id) REFERENCES public.relawan(relawan_id);
 T   ALTER TABLE ONLY public.logistik DROP CONSTRAINT logistik_logistik_relawan_id_fkey;
       public          zdn    false    4799    238    232            �           2606    73912 @   pemakaian_logistik pemakaian_logistik_pemakaian_logistik_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.pemakaian_logistik
    ADD CONSTRAINT pemakaian_logistik_pemakaian_logistik_id_fkey FOREIGN KEY (pemakaian_logistik_id) REFERENCES public.logistik(logistik_id);
 j   ALTER TABLE ONLY public.pemakaian_logistik DROP CONSTRAINT pemakaian_logistik_pemakaian_logistik_id_fkey;
       public          zdn    false    240    4811    238            �           2606    73917 ?   pemakaian_logistik pemakaian_logistik_pemakaian_relawan_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.pemakaian_logistik
    ADD CONSTRAINT pemakaian_logistik_pemakaian_relawan_id_fkey FOREIGN KEY (pemakaian_relawan_id) REFERENCES public.relawan(relawan_id);
 i   ALTER TABLE ONLY public.pemakaian_logistik DROP CONSTRAINT pemakaian_logistik_pemakaian_relawan_id_fkey;
       public          zdn    false    4799    240    232            �           2606    114733 3   quick_count quick_count_quick_count_relawan_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.quick_count
    ADD CONSTRAINT quick_count_quick_count_relawan_id_fkey FOREIGN KEY (quick_count_relawan_id) REFERENCES public.relawan(relawan_id);
 ]   ALTER TABLE ONLY public.quick_count DROP CONSTRAINT quick_count_quick_count_relawan_id_fkey;
       public          zdn    false    4799    244    232            �           2606    73822 (   relawan relawan_relawan_kandidat_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.relawan
    ADD CONSTRAINT relawan_relawan_kandidat_id_fkey FOREIGN KEY (relawan_kandidat_id) REFERENCES public.kandidat(kandidat_id);
 R   ALTER TABLE ONLY public.relawan DROP CONSTRAINT relawan_relawan_kandidat_id_fkey;
       public          zdn    false    232    4797    230            �           2606    81963 !   relawan relawan_relawan_role_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.relawan
    ADD CONSTRAINT relawan_relawan_role_fkey FOREIGN KEY (relawan_role_id) REFERENCES public.roles(role_id);
 K   ALTER TABLE ONLY public.relawan DROP CONSTRAINT relawan_relawan_role_fkey;
       public          zdn    false    4777    232    216            �           2606    65670    users users_user_partai_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_user_partai_fkey FOREIGN KEY (user_partai_id) REFERENCES public.partai(partai_id);
 F   ALTER TABLE ONLY public.users DROP CONSTRAINT users_user_partai_fkey;
       public          zdn    false    218    220    4779            �           2606    65675    users users_user_role_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_user_role_fkey FOREIGN KEY (user_role_id) REFERENCES public.roles(role_id);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_user_role_fkey;
       public          zdn    false    216    220    4777            �      x�3��,�I��2����K)����� =�       �   �   x���M�!F��)��
E�[�f3�ٔ��E�H��@�kA*_��W ����Xh��@�啴rPB�(i����uغ1P������%��-�>�s�<�1C'ڀ4a(�c
j�r��"���QXE������Fm��8�{h�Y00�ou}5b7�7���h
|r#]j���(�)��.�=��������Z?��`K��?�LqA      �   �   x�m���0E�ۯ�*PK�o��e�sV;c����̦r!�����R�)_��h@c��x�۪�k��(�$�˽�c$P�n�'m�A��	zj�6�|6�z�ͷj��(��s`��Iٰ�7qnLD2�|q�>X��������l�$~�oG(����A���h�Z��W�      ~   *   x�3��J,OTpJ,J,Q0�46�2��r��b���� ���      �      x�3���qu�2�ގ.�\1z\\\ ;��      �   �  x���K��@F�ůp�v�P�QTP���ޔ�h��tb��d��/����Թ��~Egɋ&�;^ԁ�s�����a��T��e��7]�ļ���WRʕ"�F�aw)�Y�	OC�p<���~d��9:��P��8�TT�d̈�@��0(z�!Rܶ�d���1�<�C�w�� �>�m#�_�k 	 ��q�k>�n�G�rq�1�&Z�d�HV�W��=Kw*:ʫ��O2���C}��wP�*I*�b"��(B�K�^[�����n;}wk���s�������Q��
��<�܃=k*��=���]��*�h1>�?�N�T0+#gq��L����'_��z��*'�^�R�ТP�D7�?g�Qy��������
�(�ʄJ��m��]��`/�aA�熾��Κ�5sE:Z[�����cd1����ȉ���
���R<���L�Ff�B���r>!���A�a�	      �   b   x�3�tJ�*��N�44" �4�2����O�L�#	���q$sp��%��9�K�2 �2۠��XT
��45�42�Hp��qqq ��      z   �   x�Uϱ�0���x
� iKK;����FV�Kh�
�)8����So��ܕ�>�4�m|0�l\��;3X��	���=�fؑ��TR�I"���ڈAq>V����8�0��?a�I�Տ'��v��ĖQƅ����Z�I��Tg\
�瞁��凕��v�y���m4a
�8'�f"O��DQ���V      �   :   x�=ȱ� �X��������$�nn'����ⅅ��'w/+�Bb��1摂����n
i      �      x�3�t	R��22\@�=... 9tj      �   �   x�M�A
�PD��)<A�L~���EA�n\HQ��k�0���A�)�b9����K���:��GT��l���5�k��\�<�`	�/���@�/��t:�ZH�������Wb���c���ρ��T��q+\      �   �  x�u�ˎ�@�u�.��؍�����[�l��%�Q�|�ƞ�Ďm�JΩ|�_V�2�y�,���u�e |�ȟq&d��2��^�^eMC�T����<:�v����}��A��#7��^�-������@M�a�0� � m��q;��D}�"�b̹��1 �M;-��� ���Q4�YY�"� h/���R��49J���0N�,4�Q11�y��N�b����=�o��Y��0"�3�Z���%d}���F�T[�>m�/IY<��pB��~�p�N��
�-�FI9�|f�ۭ���v���̒����e�p�"]W�_��F��A`�%�;�#L��t00�� ��S�:��҄��i܁�V/���068�:q_�� OZ�q!�}�o0�ľ)�u���D�^c5��>�$���d2�^*{����l�m����֯ÍQ8����Y,��=���4�Q��/<�Oky��N�����3      x   �   x�]���0Dg�+� ���٘YN��F�n'��i�	&�|��'B�f��D�U$�u*ҏ�"L�]]�м9�;�G��bVk�d_|�BR@���,Ʃb��W*��F�>�o�'{?���bvG?      �      x��Zi��ʶ�|��h �L���A&�E�2�
���_R��{������������z��;�Z+3�;-���źh�߫�yQK���Rjz۬x���o����k.����Iњ�HBԘI@輖�b%"0��5���͏b@Yy{�������~����f՚[:�i���.���5%�?������{��	F�;cg�{�f��G>2
ȓ�=nO�A��Yd<�Ā��r�~@lFR��>FKP۟`�Dbg�l�Izy_�,���|S�*�H ���*;�o=m�������>p|�Bb���l�苹���Y�ۘX�K����l�cE5qS@?0_������>�S̸b�ĥ�w�Kڃ�>�Ex������SGv�M�05+Z����n�3!�̽�?)sJ�C�o]�tA��Jo)�1���7�I���Φ�ֆ"Ώt��� �K��[��Z��̍ʬf�ʬ`3N�q
��껔�	Z��gbv�N>�kK��_��_��AP�pN�o����_)�bk"
6�	͓ZXs^��ku����X��g�����E4�DƏ��?HzFQ�y��yy��o�qtu�;4u��ڛ}D��v����tW�b�8�3G��\ٕ�CL$�!��Aj$k�Ŝ��k�2t�}a@|�h��3L�o%��r�x% L��#�.ҫ
8z��y�$�/.ذ呹�]��xyY1N9&��_3�f
�Z�r�|� �}�9�	��z�,��MD�U����MW��L�u|�$��`�	���N��}��B��h%6D">D�����ؙŊ0��9o�n�]��������F"Qd}>]_���s�CvF�	�t��cF/b/��aW;����X>g���%��l��YWٳ9Gz�X�P�^|�'?0|��p��)���j��rǽc�F�w�G�
˖�p�������9;�{���z�ks{�/ш? ��,=�Ko����ѧc?��/k�3�\����g�=/m����%���?W���~O{�x����	��Қ�>�-��0���t�����y�s�b���o�S����£nbkJw8��x����P�K��<a�K�#�h������p�v$���bq��P��x57bC��2f�2W��A� �:�M�}����MDܸ|�|�S�����B���R�/H��|;4PS�2aoI�ES/)M~��v����:�/8�I|��)�o��yU�H���;KH;`3W��J�1xF�k�T�YgR���Į`F��[����۩#h�,@�M��Р�_)xFkn���ۣ(�ۖM�%o���+ZY�<G<��)x����fD�Đ��	��k#>�@&x���#��'��"�l%�Ciw-���:��,n�&^�)�H�g2A�o��,��B�8^�����@��4zș�i�E�L	�u���{�����Y���b�����¾p@�E�8�	���(#��-Cgx� eq�X
j�q�G�'���M���{��*#��Ԑؘ��)����Cg��� ޾��4H}�� �d���nu�v�s�-�[���g���'b���<����?r�A����@
���sY�E
�\6����y��#��u'�E}����~lz�w|{H�gj���?�c0u�bԄ�-U�o���-��1n�$ L�kQ+yF҄ n:�fO�%�J
�����f�J�eƈ����8Q������h	D����2�l����e��%[ʎ�� ��`�Z���&��f�^��^kM�{_8�H܆e�0�J�J��ː��ɿ,D<0�����ؤ!�:K��kV_� �&B���mksL�w|��g6@.1x7��C2�3iy�؛��h�"oڵyT��3����&��?pO��h�Z�v�glA���!��(���Q���CF�����e	k8n�GNh�:�Lhw_��^��� 1���t�Z%�Ez<�Kɍp�y}v^�#v���p,A3����o�N�B�ڿ�N��fb�s��^vw���f�;Н��ZA��G&�حY��S@݃J���&�K�||2�(`f�'ww�nS��O�l�t���KG�=!��&��¬�p~4������Q,;�J�{03Aaᅂљ(, 
+Ni�Cغ�6>�'�-�e7�|G�_c���1ٵ��F���P�*h�*��J219�,ƛ�G�	<��m.�����5UZe[�R�������'2{����sr�ޔ�7��9�:��~�Z��Z�Z9匠a�R��Ju�Ѻ��^<�U�����/�4w� Eo*�`�~i�&>2v6R`
i
v�j�����xc�CLWs����z�Y/�Ua#�+-��G���be���/C�����+p�5z���I��8#�-V,���+XA�?^�!��a�RQ�LWm�|���P�A�����`�P��r�h�����89WL��B~�k�C�z|�m�{�TAXdRz�n�+e3HL���F�Q��G`:�pD��c6�r�<=h�ݱڟ΢�a>���µݳax4F�>\�þ}�l���{矈�M�G����R��|�,�ku�`��Gan�Ŗ�����=S G2���ÿ^�d��'�Tah!��}Nm+0N<��*����qw^�V(��=z��'Q@&E���վ{�澀~ ̅˵`%̋�s?|8�eJɅv�����E������GAǢ c'�{��0z�{�69\0����#��bg3`{0
���N��Fs�{~e�G�A�#
$� p�������>�&y9Y�'��'�@�:Xޤ��Ѕ5��S�X�axX}V��M+<!_��/�0n(����]b���� �̄?�ʘ\�U7ڗQ�p���@N\ք����=d�'.F&R�
�p�)r��_� ����P�>!;��gg��w���fz�m�`w���Qv�UxXj������~�^P�����MzA�x1l8��`ؘ������s�*}v~�t/7���7>�6|����?�N~�3p߽�D�E�����t�^B�Rx���<*�pS#���,^�@0�"nc_>Q�T�\?}z�j��g��ƅ��p�Ģ��Mr����.��Qt\�3��V��Y�O��F�N]��"��YA,��E]G�O��(4���&ڵ�+��H8�r��#/!D���M�eFE	���h����:�W�pMr)��[��q��p����3�����_n�sg	���&ig&Hr�rk#��(D(�N�]{��\U�/m�yu�����U����Cb�(��Ąyw��r�1#Q���Cv'fg�t��t*�q�j�mx��>2�PݸZ���9�r0�y�9�|¼{���G!�x��=G=���g����"��ك�}iT�������Nŋ]ע�+���|E�P`¼����ǽ&�^�!am��h���UY,y�n:w=N׹���Ұ�J�][�lF�!�;pFCr¼9��ܶ�L^_q�}���+��cN�i�Ϲa��NE�Z�]�dӧ-D�-��]{D�D~���h�~o�B��x�Q���A�Rݥ$"���e��u*�'��
̓�����&{��/��j�z@{��;��u���`8�2�|Kp�ȇj��F�/�?7W��efd��Y^��/��U�r��D�M�o���@��!q��������:�sj�{P䇭��J8ԙeØ֨FPhD�a�=췞|"8�a�@�(lu�/��'v�N���٥�7o�u�u���#��i�$�aQ�֓Od�<��BQ@J�y�J�p	-՞�L��y¤����aI���H���2(�0Xg�S�Q#��%�O�@�?7�����ډW�ڑ��R�j;/[;V(af9�@��'�/�G��{!'컏�ޫ��GK���6��r"/�S��v��p��r��]=\�>�b�ݧP]���������	"��pD�M)�Ua}���j��$kP3��}�o�[K���#��1Zj�*-,bc�='n^Fc���"���	�MR�	>��n��B̓\����d(�^>x�R���\ P  ŉƢ©VV.Źp���|���[e���*�-�`0P��n}��#��i��r�Y�mHM@��M��j~�T����g',�8|�����e��9�Ez>�o��n��"�BE���e�~�'�,..(# 5OT���%`�	��دo�`q"I�����>�Y8���	ߘS������;�xV~w��4�uh=bf����a,����Hl�����F+�O\�	v�\�w�m)gC��rMU��u�(��ň	��sG]����;+�R�8̐�k�Ca&~�Bs�z}~���=��[O�n{�ޗ�3�1zvps����M&�����o      |   �  x�eй��@ ��|
c��;��E��N' P�����	f!��w�/�kqAA�7��GB\0wJ��W�[5:-Y�`؈5�u�j�M���W⦇�7�C�18�c�1��8�M��� ��4�2��o�;�r�<ǋ��	.��sV:��r(?tւ�q	�ǲYNH���,��=eT��6�$��e��+ }-&y@�9���ߙ)���C�U��+��J��U�-o�.��j疵�EW��~!�B6c�t�����~�\���x�I;fB�n�7�.E�
\�ԇ��>��⍴W��7�������S�K�& �9�t�J��c�L�u螷�A���-��
Y�]����޳�idޟv�$ ������R��$��~����^��J=�0�Y��b�V��L�usL���)���§j�e���]�퉿o}1���+��"     