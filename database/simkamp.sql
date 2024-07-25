--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

-- Started on 2024-07-26 02:11:11

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 5018 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 245 (class 1255 OID 172116)
-- Name: adjust_logistik_stok(); Type: FUNCTION; Schema: public; Owner: zdn
--

CREATE FUNCTION public.adjust_logistik_stok() RETURNS trigger
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


ALTER FUNCTION public.adjust_logistik_stok() OWNER TO zdn;

--
-- TOC entry 246 (class 1255 OID 172117)
-- Name: restore_logistik_stok(); Type: FUNCTION; Schema: public; Owner: zdn
--

CREATE FUNCTION public.restore_logistik_stok() RETURNS trigger
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


ALTER FUNCTION public.restore_logistik_stok() OWNER TO zdn;

--
-- TOC entry 247 (class 1255 OID 172118)
-- Name: update_logistik_stok(); Type: FUNCTION; Schema: public; Owner: zdn
--

CREATE FUNCTION public.update_logistik_stok() RETURNS trigger
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


ALTER FUNCTION public.update_logistik_stok() OWNER TO zdn;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 172119)
-- Name: agama; Type: TABLE; Schema: public; Owner: zdn
--

CREATE TABLE public.agama (
    agama_id integer NOT NULL,
    agama character varying(255)
);


ALTER TABLE public.agama OWNER TO zdn;

--
-- TOC entry 216 (class 1259 OID 172122)
-- Name: agama_agama_id_seq; Type: SEQUENCE; Schema: public; Owner: zdn
--

CREATE SEQUENCE public.agama_agama_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.agama_agama_id_seq OWNER TO zdn;

--
-- TOC entry 5019 (class 0 OID 0)
-- Dependencies: 216
-- Name: agama_agama_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zdn
--

ALTER SEQUENCE public.agama_agama_id_seq OWNED BY public.agama.agama_id;


--
-- TOC entry 217 (class 1259 OID 172123)
-- Name: arus_kas; Type: TABLE; Schema: public; Owner: zdn
--

CREATE TABLE public.arus_kas (
    aruskas_id integer NOT NULL,
    aruskas_kategori character varying(255),
    aruskas_foto_kuitansi character varying(255),
    aruskas_detail character varying(255),
    aruskas_catatan character varying(255),
    aruskas_jumlah integer,
    aruskas_relawan_id integer,
    aruskas_tanggal character varying(255)
);


ALTER TABLE public.arus_kas OWNER TO zdn;

--
-- TOC entry 218 (class 1259 OID 172128)
-- Name: arus_kas_aruskas_id_seq; Type: SEQUENCE; Schema: public; Owner: zdn
--

CREATE SEQUENCE public.arus_kas_aruskas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.arus_kas_aruskas_id_seq OWNER TO zdn;

--
-- TOC entry 5020 (class 0 OID 0)
-- Dependencies: 218
-- Name: arus_kas_aruskas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zdn
--

ALTER SEQUENCE public.arus_kas_aruskas_id_seq OWNED BY public.arus_kas.aruskas_id;


--
-- TOC entry 219 (class 1259 OID 172129)
-- Name: calon_pemilih; Type: TABLE; Schema: public; Owner: zdn
--

CREATE TABLE public.calon_pemilih (
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


ALTER TABLE public.calon_pemilih OWNER TO zdn;

--
-- TOC entry 220 (class 1259 OID 172134)
-- Name: calon_pemilih_calon_pemilih_id_seq; Type: SEQUENCE; Schema: public; Owner: zdn
--

CREATE SEQUENCE public.calon_pemilih_calon_pemilih_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.calon_pemilih_calon_pemilih_id_seq OWNER TO zdn;

--
-- TOC entry 5021 (class 0 OID 0)
-- Dependencies: 220
-- Name: calon_pemilih_calon_pemilih_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zdn
--

ALTER SEQUENCE public.calon_pemilih_calon_pemilih_id_seq OWNED BY public.calon_pemilih.calon_pemilih_id;


--
-- TOC entry 221 (class 1259 OID 172135)
-- Name: dapil; Type: TABLE; Schema: public; Owner: zdn
--

CREATE TABLE public.dapil (
    dapil_id integer NOT NULL,
    dapil_nama character varying(255),
    dapil_provinsi integer
);


ALTER TABLE public.dapil OWNER TO zdn;

--
-- TOC entry 222 (class 1259 OID 172138)
-- Name: dapil_dapil_id_seq; Type: SEQUENCE; Schema: public; Owner: zdn
--

CREATE SEQUENCE public.dapil_dapil_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.dapil_dapil_id_seq OWNER TO zdn;

--
-- TOC entry 5022 (class 0 OID 0)
-- Dependencies: 222
-- Name: dapil_dapil_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zdn
--

ALTER SEQUENCE public.dapil_dapil_id_seq OWNED BY public.dapil.dapil_id;


--
-- TOC entry 223 (class 1259 OID 172139)
-- Name: jenis_pemilihan; Type: TABLE; Schema: public; Owner: zdn
--

CREATE TABLE public.jenis_pemilihan (
    jenis_pemilihan_id integer NOT NULL,
    jenis_pemilihan character varying(255)
);


ALTER TABLE public.jenis_pemilihan OWNER TO zdn;

--
-- TOC entry 224 (class 1259 OID 172142)
-- Name: jenis_pemilihan_jenis_pemilihan_id_seq; Type: SEQUENCE; Schema: public; Owner: zdn
--

CREATE SEQUENCE public.jenis_pemilihan_jenis_pemilihan_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.jenis_pemilihan_jenis_pemilihan_id_seq OWNER TO zdn;

--
-- TOC entry 5023 (class 0 OID 0)
-- Dependencies: 224
-- Name: jenis_pemilihan_jenis_pemilihan_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zdn
--

ALTER SEQUENCE public.jenis_pemilihan_jenis_pemilihan_id_seq OWNED BY public.jenis_pemilihan.jenis_pemilihan_id;


--
-- TOC entry 225 (class 1259 OID 172143)
-- Name: kandidat; Type: TABLE; Schema: public; Owner: zdn
--

CREATE TABLE public.kandidat (
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


ALTER TABLE public.kandidat OWNER TO zdn;

--
-- TOC entry 226 (class 1259 OID 172148)
-- Name: kandidat_kandidat_id_seq; Type: SEQUENCE; Schema: public; Owner: zdn
--

CREATE SEQUENCE public.kandidat_kandidat_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.kandidat_kandidat_id_seq OWNER TO zdn;

--
-- TOC entry 5024 (class 0 OID 0)
-- Dependencies: 226
-- Name: kandidat_kandidat_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zdn
--

ALTER SEQUENCE public.kandidat_kandidat_id_seq OWNED BY public.kandidat.kandidat_id;


--
-- TOC entry 227 (class 1259 OID 172149)
-- Name: logistik; Type: TABLE; Schema: public; Owner: zdn
--

CREATE TABLE public.logistik (
    logistik_id integer NOT NULL,
    logistik_nama_atribut character varying(255),
    logistik_satuan_unit character varying(255),
    logistik_stok integer,
    logistik_total_harga character varying(255),
    logistik_relawan_id integer
);


ALTER TABLE public.logistik OWNER TO zdn;

--
-- TOC entry 228 (class 1259 OID 172154)
-- Name: logistik_logistik_id_seq; Type: SEQUENCE; Schema: public; Owner: zdn
--

CREATE SEQUENCE public.logistik_logistik_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.logistik_logistik_id_seq OWNER TO zdn;

--
-- TOC entry 5025 (class 0 OID 0)
-- Dependencies: 228
-- Name: logistik_logistik_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zdn
--

ALTER SEQUENCE public.logistik_logistik_id_seq OWNED BY public.logistik.logistik_id;


--
-- TOC entry 229 (class 1259 OID 172155)
-- Name: partai; Type: TABLE; Schema: public; Owner: zdn
--

CREATE TABLE public.partai (
    partai_id integer NOT NULL,
    partai_label character varying(255),
    partai_nama character varying(255),
    partai_nomor character varying(255),
    partai_logo character varying(255)
);


ALTER TABLE public.partai OWNER TO zdn;

--
-- TOC entry 230 (class 1259 OID 172160)
-- Name: partai_partai_id_seq; Type: SEQUENCE; Schema: public; Owner: zdn
--

CREATE SEQUENCE public.partai_partai_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.partai_partai_id_seq OWNER TO zdn;

--
-- TOC entry 5026 (class 0 OID 0)
-- Dependencies: 230
-- Name: partai_partai_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zdn
--

ALTER SEQUENCE public.partai_partai_id_seq OWNED BY public.partai.partai_id;


--
-- TOC entry 231 (class 1259 OID 172161)
-- Name: pemakaian_logistik; Type: TABLE; Schema: public; Owner: zdn
--

CREATE TABLE public.pemakaian_logistik (
    pemakaian_id integer NOT NULL,
    pemakaian_tanggal character varying(255),
    pemakaian_jumlah integer,
    pemakaian_logistik_id integer,
    pemakaian_relawan_id integer
);


ALTER TABLE public.pemakaian_logistik OWNER TO zdn;

--
-- TOC entry 232 (class 1259 OID 172164)
-- Name: pemakaian_logistik_pemakaian_id_seq; Type: SEQUENCE; Schema: public; Owner: zdn
--

CREATE SEQUENCE public.pemakaian_logistik_pemakaian_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pemakaian_logistik_pemakaian_id_seq OWNER TO zdn;

--
-- TOC entry 5027 (class 0 OID 0)
-- Dependencies: 232
-- Name: pemakaian_logistik_pemakaian_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zdn
--

ALTER SEQUENCE public.pemakaian_logistik_pemakaian_id_seq OWNED BY public.pemakaian_logistik.pemakaian_id;


--
-- TOC entry 233 (class 1259 OID 172165)
-- Name: posisi_calon_tetap; Type: TABLE; Schema: public; Owner: zdn
--

CREATE TABLE public.posisi_calon_tetap (
    posisi_calon_tetap_id integer NOT NULL,
    posisi_calon_tetap character varying(255)
);


ALTER TABLE public.posisi_calon_tetap OWNER TO zdn;

--
-- TOC entry 234 (class 1259 OID 172168)
-- Name: posisis_calon_tetap_calon_tetap_id_seq; Type: SEQUENCE; Schema: public; Owner: zdn
--

CREATE SEQUENCE public.posisis_calon_tetap_calon_tetap_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.posisis_calon_tetap_calon_tetap_id_seq OWNER TO zdn;

--
-- TOC entry 5028 (class 0 OID 0)
-- Dependencies: 234
-- Name: posisis_calon_tetap_calon_tetap_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zdn
--

ALTER SEQUENCE public.posisis_calon_tetap_calon_tetap_id_seq OWNED BY public.posisi_calon_tetap.posisi_calon_tetap_id;


--
-- TOC entry 235 (class 1259 OID 172169)
-- Name: quick_count; Type: TABLE; Schema: public; Owner: zdn
--

CREATE TABLE public.quick_count (
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


ALTER TABLE public.quick_count OWNER TO zdn;

--
-- TOC entry 236 (class 1259 OID 172174)
-- Name: quick_count_quick_count_id_seq; Type: SEQUENCE; Schema: public; Owner: zdn
--

CREATE SEQUENCE public.quick_count_quick_count_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.quick_count_quick_count_id_seq OWNER TO zdn;

--
-- TOC entry 5029 (class 0 OID 0)
-- Dependencies: 236
-- Name: quick_count_quick_count_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zdn
--

ALTER SEQUENCE public.quick_count_quick_count_id_seq OWNED BY public.quick_count.quick_count_id;


--
-- TOC entry 237 (class 1259 OID 172175)
-- Name: relawan; Type: TABLE; Schema: public; Owner: zdn
--

CREATE TABLE public.relawan (
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


ALTER TABLE public.relawan OWNER TO zdn;

--
-- TOC entry 238 (class 1259 OID 172180)
-- Name: relawan_relawan_id_seq; Type: SEQUENCE; Schema: public; Owner: zdn
--

CREATE SEQUENCE public.relawan_relawan_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.relawan_relawan_id_seq OWNER TO zdn;

--
-- TOC entry 5030 (class 0 OID 0)
-- Dependencies: 238
-- Name: relawan_relawan_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zdn
--

ALTER SEQUENCE public.relawan_relawan_id_seq OWNED BY public.relawan.relawan_id;


--
-- TOC entry 239 (class 1259 OID 172181)
-- Name: roles; Type: TABLE; Schema: public; Owner: zdn
--

CREATE TABLE public.roles (
    role_id integer NOT NULL,
    role character varying(255),
    role_deskripsi character varying(255)
);


ALTER TABLE public.roles OWNER TO zdn;

--
-- TOC entry 240 (class 1259 OID 172186)
-- Name: roles_role_id_seq; Type: SEQUENCE; Schema: public; Owner: zdn
--

CREATE SEQUENCE public.roles_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_role_id_seq OWNER TO zdn;

--
-- TOC entry 5031 (class 0 OID 0)
-- Dependencies: 240
-- Name: roles_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zdn
--

ALTER SEQUENCE public.roles_role_id_seq OWNED BY public.roles.role_id;


--
-- TOC entry 241 (class 1259 OID 172187)
-- Name: token_blacklist; Type: TABLE; Schema: public; Owner: zdn
--

CREATE TABLE public.token_blacklist (
    id integer NOT NULL,
    token text NOT NULL,
    expiry timestamp without time zone NOT NULL
);


ALTER TABLE public.token_blacklist OWNER TO zdn;

--
-- TOC entry 242 (class 1259 OID 172192)
-- Name: token_blacklist_id_seq; Type: SEQUENCE; Schema: public; Owner: zdn
--

CREATE SEQUENCE public.token_blacklist_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.token_blacklist_id_seq OWNER TO zdn;

--
-- TOC entry 5032 (class 0 OID 0)
-- Dependencies: 242
-- Name: token_blacklist_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zdn
--

ALTER SEQUENCE public.token_blacklist_id_seq OWNED BY public.token_blacklist.id;


--
-- TOC entry 243 (class 1259 OID 172193)
-- Name: users; Type: TABLE; Schema: public; Owner: zdn
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    user_nama character varying(255),
    user_email character varying(255),
    user_password character varying(255),
    user_no_telp character varying(255),
    user_partai_id integer,
    user_role_id integer
);


ALTER TABLE public.users OWNER TO zdn;

--
-- TOC entry 244 (class 1259 OID 172198)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: zdn
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_user_id_seq OWNER TO zdn;

--
-- TOC entry 5033 (class 0 OID 0)
-- Dependencies: 244
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zdn
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 4761 (class 2604 OID 172378)
-- Name: agama agama_id; Type: DEFAULT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.agama ALTER COLUMN agama_id SET DEFAULT nextval('public.agama_agama_id_seq'::regclass);


--
-- TOC entry 4762 (class 2604 OID 172379)
-- Name: arus_kas aruskas_id; Type: DEFAULT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.arus_kas ALTER COLUMN aruskas_id SET DEFAULT nextval('public.arus_kas_aruskas_id_seq'::regclass);


--
-- TOC entry 4763 (class 2604 OID 172380)
-- Name: calon_pemilih calon_pemilih_id; Type: DEFAULT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.calon_pemilih ALTER COLUMN calon_pemilih_id SET DEFAULT nextval('public.calon_pemilih_calon_pemilih_id_seq'::regclass);


--
-- TOC entry 4764 (class 2604 OID 172381)
-- Name: dapil dapil_id; Type: DEFAULT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.dapil ALTER COLUMN dapil_id SET DEFAULT nextval('public.dapil_dapil_id_seq'::regclass);


--
-- TOC entry 4765 (class 2604 OID 172382)
-- Name: jenis_pemilihan jenis_pemilihan_id; Type: DEFAULT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.jenis_pemilihan ALTER COLUMN jenis_pemilihan_id SET DEFAULT nextval('public.jenis_pemilihan_jenis_pemilihan_id_seq'::regclass);


--
-- TOC entry 4766 (class 2604 OID 172383)
-- Name: kandidat kandidat_id; Type: DEFAULT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.kandidat ALTER COLUMN kandidat_id SET DEFAULT nextval('public.kandidat_kandidat_id_seq'::regclass);


--
-- TOC entry 4767 (class 2604 OID 172384)
-- Name: logistik logistik_id; Type: DEFAULT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.logistik ALTER COLUMN logistik_id SET DEFAULT nextval('public.logistik_logistik_id_seq'::regclass);


--
-- TOC entry 4768 (class 2604 OID 172385)
-- Name: partai partai_id; Type: DEFAULT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.partai ALTER COLUMN partai_id SET DEFAULT nextval('public.partai_partai_id_seq'::regclass);


--
-- TOC entry 4769 (class 2604 OID 172386)
-- Name: pemakaian_logistik pemakaian_id; Type: DEFAULT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.pemakaian_logistik ALTER COLUMN pemakaian_id SET DEFAULT nextval('public.pemakaian_logistik_pemakaian_id_seq'::regclass);


--
-- TOC entry 4770 (class 2604 OID 172387)
-- Name: posisi_calon_tetap posisi_calon_tetap_id; Type: DEFAULT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.posisi_calon_tetap ALTER COLUMN posisi_calon_tetap_id SET DEFAULT nextval('public.posisis_calon_tetap_calon_tetap_id_seq'::regclass);


--
-- TOC entry 4771 (class 2604 OID 172388)
-- Name: quick_count quick_count_id; Type: DEFAULT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.quick_count ALTER COLUMN quick_count_id SET DEFAULT nextval('public.quick_count_quick_count_id_seq'::regclass);


--
-- TOC entry 4772 (class 2604 OID 172389)
-- Name: relawan relawan_id; Type: DEFAULT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.relawan ALTER COLUMN relawan_id SET DEFAULT nextval('public.relawan_relawan_id_seq'::regclass);


--
-- TOC entry 4773 (class 2604 OID 172390)
-- Name: roles role_id; Type: DEFAULT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.roles ALTER COLUMN role_id SET DEFAULT nextval('public.roles_role_id_seq'::regclass);


--
-- TOC entry 4774 (class 2604 OID 172391)
-- Name: token_blacklist id; Type: DEFAULT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.token_blacklist ALTER COLUMN id SET DEFAULT nextval('public.token_blacklist_id_seq'::regclass);


--
-- TOC entry 4775 (class 2604 OID 172392)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 4983 (class 0 OID 172119)
-- Dependencies: 215
-- Data for Name: agama; Type: TABLE DATA; Schema: public; Owner: zdn
--

COPY public.agama (agama_id, agama) FROM stdin;
5	Kristen
6	Islam
7	Hindu
8	Buddha
\.


--
-- TOC entry 4985 (class 0 OID 172123)
-- Dependencies: 217
-- Data for Name: arus_kas; Type: TABLE DATA; Schema: public; Owner: zdn
--

COPY public.arus_kas (aruskas_id, aruskas_kategori, aruskas_foto_kuitansi, aruskas_detail, aruskas_catatan, aruskas_jumlah, aruskas_relawan_id, aruskas_tanggal) FROM stdin;
\.


--
-- TOC entry 4987 (class 0 OID 172129)
-- Dependencies: 219
-- Data for Name: calon_pemilih; Type: TABLE DATA; Schema: public; Owner: zdn
--

COPY public.calon_pemilih (calon_pemilih_id, calon_pemilih_nama, calon_pemilih_no_telp, calon_pemilih_foto, calon_pemilih_foto_ktp, calon_pemilih_provinsi, calon_pemilih_kab_kota, calon_pemilih_kecamatan, calon_pemilih_kelurahan, calon_pemilih_status, calon_pemilih_relawan_id) FROM stdin;
\.


--
-- TOC entry 4989 (class 0 OID 172135)
-- Dependencies: 221
-- Data for Name: dapil; Type: TABLE DATA; Schema: public; Owner: zdn
--

COPY public.dapil (dapil_id, dapil_nama, dapil_provinsi) FROM stdin;
4	Jawa Barat 1	32
\.


--
-- TOC entry 4991 (class 0 OID 172139)
-- Dependencies: 223
-- Data for Name: jenis_pemilihan; Type: TABLE DATA; Schema: public; Owner: zdn
--

COPY public.jenis_pemilihan (jenis_pemilihan_id, jenis_pemilihan) FROM stdin;
5	PEMILU
6	PILEG
7	PILKADA
\.


--
-- TOC entry 4993 (class 0 OID 172143)
-- Dependencies: 225
-- Data for Name: kandidat; Type: TABLE DATA; Schema: public; Owner: zdn
--

COPY public.kandidat (kandidat_id, kandidat_nama, kandidat_email, kandidat_password, kandidat_no_telp, kandidat_agama_id, kandidat_foto, kandidat_usia, kandidat_partai_id, kandidat_alamat, kandidat_admin_id, kandidat_dapil_id, kandidat_jenis_pemilihan_id, kandidat_posisi_calon_tetap_id, kandidat_jenis_kelamin, kandidat_role_id, kandidat_nomor_urut) FROM stdin;
10	Anies Rasyid Baswedan 	anies@gmail.com	$2b$10$PZWQ5Gy8ny/WK3eaaOKMWetO2aUq.wiiYbjIB8OkSfgJjyAnhKN1q	088213365615	6	images/1721805149836.png	50	14	Jl.Kuningan	10	4	6	5	laki-laki	4	10
\.


--
-- TOC entry 4995 (class 0 OID 172149)
-- Dependencies: 227
-- Data for Name: logistik; Type: TABLE DATA; Schema: public; Owner: zdn
--

COPY public.logistik (logistik_id, logistik_nama_atribut, logistik_satuan_unit, logistik_stok, logistik_total_harga, logistik_relawan_id) FROM stdin;
\.


--
-- TOC entry 4997 (class 0 OID 172155)
-- Dependencies: 229
-- Data for Name: partai; Type: TABLE DATA; Schema: public; Owner: zdn
--

COPY public.partai (partai_id, partai_label, partai_nama, partai_nomor, partai_logo) FROM stdin;
14	PKS	Partai Keadilan Sejahtera	8	images/1721645895067.png
\.


--
-- TOC entry 4999 (class 0 OID 172161)
-- Dependencies: 231
-- Data for Name: pemakaian_logistik; Type: TABLE DATA; Schema: public; Owner: zdn
--

COPY public.pemakaian_logistik (pemakaian_id, pemakaian_tanggal, pemakaian_jumlah, pemakaian_logistik_id, pemakaian_relawan_id) FROM stdin;
\.


--
-- TOC entry 5001 (class 0 OID 172165)
-- Dependencies: 233
-- Data for Name: posisi_calon_tetap; Type: TABLE DATA; Schema: public; Owner: zdn
--

COPY public.posisi_calon_tetap (posisi_calon_tetap_id, posisi_calon_tetap) FROM stdin;
5	DPR RI
6	DPD
7	DPRD Provinsi
8	DPRD Kab/Kota
\.


--
-- TOC entry 5003 (class 0 OID 172169)
-- Dependencies: 235
-- Data for Name: quick_count; Type: TABLE DATA; Schema: public; Owner: zdn
--

COPY public.quick_count (quick_count_id, quick_count_provinsi, quick_count_kab_kota, quick_count_kecamatan, quick_count_kelurahan, quick_count_jumlah_suara, quick_count_relawan_id, quick_count_foto, quick_count_tps) FROM stdin;
\.


--
-- TOC entry 5005 (class 0 OID 172175)
-- Dependencies: 237
-- Data for Name: relawan; Type: TABLE DATA; Schema: public; Owner: zdn
--

COPY public.relawan (relawan_id, relawan_nama, relawan_email, relawan_password, relawan_no_telp, relawan_usia, relawan_jenis_kelamin, relawan_foto, relawan_provinsi_kode, relawan_kab_kota_kode, relawan_status, relawan_kandidat_id, relawan_role_id) FROM stdin;
12	Rani	rani@gmail.com	$2b$10$YzPgkHIf1r5iGTYG00orrev.B5G8gYOqBTMGP6jcO0Mcx6KXOVovy	088213365611	20	perempuan	images/1721805577457.jpg	32	32.04	aktif	10	5
\.


--
-- TOC entry 5007 (class 0 OID 172181)
-- Dependencies: 239
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: zdn
--

COPY public.roles (role_id, role, role_deskripsi) FROM stdin;
1	admin-partai	Administrator partai dengan akses khusus
2	administrator	Administrator dengan akses penuh ke sistem
4	kandidat	Kandidat anggota partai
5	relawan	Relawan anggota sukarela kandidat
\.


--
-- TOC entry 5009 (class 0 OID 172187)
-- Dependencies: 241
-- Data for Name: token_blacklist; Type: TABLE DATA; Schema: public; Owner: zdn
--

COPY public.token_blacklist (id, token, expiry) FROM stdin;
170	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwicm9sZSI6ImFkbWluaXN0cmF0b3IiLCJpYXQiOjE3MjE2NDMzODcsImV4cCI6MTcyMTcyOTc4N30._FL_XsV78n12tLh2JWyh2Hf4o3vANsgL1SHeiiGehuA	2024-07-22 17:32:22.725
171	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwicm9sZSI6ImFkbWluaXN0cmF0b3IiLCJpYXQiOjE3MjE2NDM2MzYsImV4cCI6MTcyMTczMDAzNn0.G3gxI1SId-9U71eKhmFfwejYnfAn27kUjZ-2YRyxqXM	2024-07-22 18:14:19.811
172	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInJvbGUiOiJhZG1pbi1wYXJ0YWkiLCJpYXQiOjE3MjE2NDU5NzIsImV4cCI6MTcyMTczMjM3Mn0.2rRkMhSX_qyY08dRN-JPcT8fVdWuNZDqdTCPy8LoG8c	2024-07-22 19:26:47.5
173	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwicm9sZSI6ImFkbWluaXN0cmF0b3IiLCJpYXQiOjE3MjE2NTA0MjUsImV4cCI6MTcyMTczNjgyNX0.DEvEd9nGbatz6VPcl9TxTzvkFU8I8OUWJESU_8LxiiM	2024-07-22 21:11:16.047
206	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwicm9sZSI6ImFkbWluaXN0cmF0b3IiLCJpYXQiOjE3MjE3MjI3MDYsImV4cCI6MTcyMTgwOTEwNn0.RuJxq3Ip39g-m28cTl59G74Zzxhx3uOAFYWPXXv_6mg	2024-07-24 14:26:07.287
207	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInJvbGUiOiJhZG1pbi1wYXJ0YWkiLCJpYXQiOjE3MjE4MDUwODMsImV4cCI6MTcyMTg5MTQ4M30.gECV25lqTS2G12M12kMlb-N14IDwyCIhpbVAG20yEBE	2024-07-24 14:32:41.117
208	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInJvbGUiOiJrYW5kaWRhdCIsImlhdCI6MTcyMTgwNTQ4NCwiZXhwIjoxNzIxODkxODg0fQ.ZQhdYhUwK037D3urvNw1jEMqNvnXyB0YsaQAy-pvdEI	2024-07-24 15:08:26.382
\.


--
-- TOC entry 5011 (class 0 OID 172193)
-- Dependencies: 243
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: zdn
--

COPY public.users (user_id, user_nama, user_email, user_password, user_no_telp, user_partai_id, user_role_id) FROM stdin;
9	administrator	simkamp@gmail.com	$2a$12$F.bSAt7rv8RUW4c1kCOVs.GD0cgtd7MwZq35.BylZpoxvypuDPKL.	089615273507	\N	2
10	Suwardi	swr@gmail.com	$2b$10$xaxjCjzOn7G6gPOy/icm0ug/74bz9zt/Wj6NpQeQhAEmp89rucaFu	089615271234	14	1
\.


--
-- TOC entry 5034 (class 0 OID 0)
-- Dependencies: 216
-- Name: agama_agama_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zdn
--

SELECT pg_catalog.setval('public.agama_agama_id_seq', 8, true);


--
-- TOC entry 5035 (class 0 OID 0)
-- Dependencies: 218
-- Name: arus_kas_aruskas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zdn
--

SELECT pg_catalog.setval('public.arus_kas_aruskas_id_seq', 5, true);


--
-- TOC entry 5036 (class 0 OID 0)
-- Dependencies: 220
-- Name: calon_pemilih_calon_pemilih_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zdn
--

SELECT pg_catalog.setval('public.calon_pemilih_calon_pemilih_id_seq', 5, true);


--
-- TOC entry 5037 (class 0 OID 0)
-- Dependencies: 222
-- Name: dapil_dapil_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zdn
--

SELECT pg_catalog.setval('public.dapil_dapil_id_seq', 4, true);


--
-- TOC entry 5038 (class 0 OID 0)
-- Dependencies: 224
-- Name: jenis_pemilihan_jenis_pemilihan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zdn
--

SELECT pg_catalog.setval('public.jenis_pemilihan_jenis_pemilihan_id_seq', 7, true);


--
-- TOC entry 5039 (class 0 OID 0)
-- Dependencies: 226
-- Name: kandidat_kandidat_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zdn
--

SELECT pg_catalog.setval('public.kandidat_kandidat_id_seq', 10, true);


--
-- TOC entry 5040 (class 0 OID 0)
-- Dependencies: 228
-- Name: logistik_logistik_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zdn
--

SELECT pg_catalog.setval('public.logistik_logistik_id_seq', 7, true);


--
-- TOC entry 5041 (class 0 OID 0)
-- Dependencies: 230
-- Name: partai_partai_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zdn
--

SELECT pg_catalog.setval('public.partai_partai_id_seq', 14, true);


--
-- TOC entry 5042 (class 0 OID 0)
-- Dependencies: 232
-- Name: pemakaian_logistik_pemakaian_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zdn
--

SELECT pg_catalog.setval('public.pemakaian_logistik_pemakaian_id_seq', 11, true);


--
-- TOC entry 5043 (class 0 OID 0)
-- Dependencies: 234
-- Name: posisis_calon_tetap_calon_tetap_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zdn
--

SELECT pg_catalog.setval('public.posisis_calon_tetap_calon_tetap_id_seq', 8, true);


--
-- TOC entry 5044 (class 0 OID 0)
-- Dependencies: 236
-- Name: quick_count_quick_count_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zdn
--

SELECT pg_catalog.setval('public.quick_count_quick_count_id_seq', 4, true);


--
-- TOC entry 5045 (class 0 OID 0)
-- Dependencies: 238
-- Name: relawan_relawan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zdn
--

SELECT pg_catalog.setval('public.relawan_relawan_id_seq', 12, true);


--
-- TOC entry 5046 (class 0 OID 0)
-- Dependencies: 240
-- Name: roles_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zdn
--

SELECT pg_catalog.setval('public.roles_role_id_seq', 8, true);


--
-- TOC entry 5047 (class 0 OID 0)
-- Dependencies: 242
-- Name: token_blacklist_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zdn
--

SELECT pg_catalog.setval('public.token_blacklist_id_seq', 208, true);


--
-- TOC entry 5048 (class 0 OID 0)
-- Dependencies: 244
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zdn
--

SELECT pg_catalog.setval('public.users_user_id_seq', 10, true);


--
-- TOC entry 4777 (class 2606 OID 172215)
-- Name: agama agama_pkey; Type: CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.agama
    ADD CONSTRAINT agama_pkey PRIMARY KEY (agama_id);


--
-- TOC entry 4779 (class 2606 OID 172217)
-- Name: arus_kas arus_kas_pkey; Type: CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.arus_kas
    ADD CONSTRAINT arus_kas_pkey PRIMARY KEY (aruskas_id);


--
-- TOC entry 4781 (class 2606 OID 172219)
-- Name: calon_pemilih calon_pemilih_calon_pemilih_no_telp_key; Type: CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.calon_pemilih
    ADD CONSTRAINT calon_pemilih_calon_pemilih_no_telp_key UNIQUE (calon_pemilih_no_telp);


--
-- TOC entry 4783 (class 2606 OID 172221)
-- Name: calon_pemilih calon_pemilih_pkey; Type: CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.calon_pemilih
    ADD CONSTRAINT calon_pemilih_pkey PRIMARY KEY (calon_pemilih_id);


--
-- TOC entry 4785 (class 2606 OID 172223)
-- Name: dapil dapil_pkey; Type: CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.dapil
    ADD CONSTRAINT dapil_pkey PRIMARY KEY (dapil_id);


--
-- TOC entry 4787 (class 2606 OID 172225)
-- Name: jenis_pemilihan jenis_pemilihan_pkey; Type: CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.jenis_pemilihan
    ADD CONSTRAINT jenis_pemilihan_pkey PRIMARY KEY (jenis_pemilihan_id);


--
-- TOC entry 4789 (class 2606 OID 172227)
-- Name: kandidat kandidat_kandidat_email_key; Type: CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.kandidat
    ADD CONSTRAINT kandidat_kandidat_email_key UNIQUE (kandidat_email);


--
-- TOC entry 4791 (class 2606 OID 172229)
-- Name: kandidat kandidat_kandidat_no_telp_key; Type: CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.kandidat
    ADD CONSTRAINT kandidat_kandidat_no_telp_key UNIQUE (kandidat_no_telp);


--
-- TOC entry 4793 (class 2606 OID 172231)
-- Name: kandidat kandidat_pkey; Type: CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.kandidat
    ADD CONSTRAINT kandidat_pkey PRIMARY KEY (kandidat_id);


--
-- TOC entry 4795 (class 2606 OID 172233)
-- Name: logistik logistik_pkey; Type: CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.logistik
    ADD CONSTRAINT logistik_pkey PRIMARY KEY (logistik_id);


--
-- TOC entry 4797 (class 2606 OID 172235)
-- Name: partai partai_pkey; Type: CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.partai
    ADD CONSTRAINT partai_pkey PRIMARY KEY (partai_id);


--
-- TOC entry 4799 (class 2606 OID 172237)
-- Name: pemakaian_logistik pemakaian_logistik_pkey; Type: CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.pemakaian_logistik
    ADD CONSTRAINT pemakaian_logistik_pkey PRIMARY KEY (pemakaian_id);


--
-- TOC entry 4801 (class 2606 OID 172239)
-- Name: posisi_calon_tetap posisis_calon_tetap_pkey; Type: CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.posisi_calon_tetap
    ADD CONSTRAINT posisis_calon_tetap_pkey PRIMARY KEY (posisi_calon_tetap_id);


--
-- TOC entry 4803 (class 2606 OID 172241)
-- Name: quick_count quick_count_pkey; Type: CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.quick_count
    ADD CONSTRAINT quick_count_pkey PRIMARY KEY (quick_count_id);


--
-- TOC entry 4805 (class 2606 OID 172243)
-- Name: relawan relawan_pkey; Type: CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.relawan
    ADD CONSTRAINT relawan_pkey PRIMARY KEY (relawan_id);


--
-- TOC entry 4807 (class 2606 OID 172245)
-- Name: relawan relawan_relawan_email_key; Type: CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.relawan
    ADD CONSTRAINT relawan_relawan_email_key UNIQUE (relawan_email);


--
-- TOC entry 4809 (class 2606 OID 172247)
-- Name: relawan relawan_relawan_no_telp_key; Type: CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.relawan
    ADD CONSTRAINT relawan_relawan_no_telp_key UNIQUE (relawan_no_telp);


--
-- TOC entry 4811 (class 2606 OID 172249)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (role_id);


--
-- TOC entry 4813 (class 2606 OID 172251)
-- Name: token_blacklist token_blacklist_pkey; Type: CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.token_blacklist
    ADD CONSTRAINT token_blacklist_pkey PRIMARY KEY (id);


--
-- TOC entry 4815 (class 2606 OID 172253)
-- Name: token_blacklist token_blacklist_token_key; Type: CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.token_blacklist
    ADD CONSTRAINT token_blacklist_token_key UNIQUE (token);


--
-- TOC entry 4817 (class 2606 OID 172255)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 4819 (class 2606 OID 172257)
-- Name: users users_user_email_key; Type: CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_user_email_key UNIQUE (user_email);


--
-- TOC entry 4837 (class 2620 OID 172258)
-- Name: pemakaian_logistik trg_adjust_logistik_stok; Type: TRIGGER; Schema: public; Owner: zdn
--

CREATE TRIGGER trg_adjust_logistik_stok AFTER UPDATE ON public.pemakaian_logistik FOR EACH ROW EXECUTE FUNCTION public.adjust_logistik_stok();


--
-- TOC entry 4838 (class 2620 OID 172259)
-- Name: pemakaian_logistik trg_restore_logistik_stok; Type: TRIGGER; Schema: public; Owner: zdn
--

CREATE TRIGGER trg_restore_logistik_stok AFTER DELETE ON public.pemakaian_logistik FOR EACH ROW EXECUTE FUNCTION public.restore_logistik_stok();


--
-- TOC entry 4839 (class 2620 OID 172260)
-- Name: pemakaian_logistik trg_update_logistik_stok; Type: TRIGGER; Schema: public; Owner: zdn
--

CREATE TRIGGER trg_update_logistik_stok AFTER INSERT ON public.pemakaian_logistik FOR EACH ROW EXECUTE FUNCTION public.update_logistik_stok();


--
-- TOC entry 4820 (class 2606 OID 172261)
-- Name: arus_kas arus_kas_aruskas_relawan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.arus_kas
    ADD CONSTRAINT arus_kas_aruskas_relawan_id_fkey FOREIGN KEY (aruskas_relawan_id) REFERENCES public.relawan(relawan_id);


--
-- TOC entry 4821 (class 2606 OID 172266)
-- Name: calon_pemilih calon_pemilih_calon_pemilih_relawan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.calon_pemilih
    ADD CONSTRAINT calon_pemilih_calon_pemilih_relawan_id_fkey FOREIGN KEY (calon_pemilih_relawan_id) REFERENCES public.relawan(relawan_id);


--
-- TOC entry 4822 (class 2606 OID 172271)
-- Name: kandidat kandidat_kandidat_admin_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.kandidat
    ADD CONSTRAINT kandidat_kandidat_admin_id_fkey FOREIGN KEY (kandidat_admin_id) REFERENCES public.users(user_id);


--
-- TOC entry 4823 (class 2606 OID 172276)
-- Name: kandidat kandidat_kandidat_agama_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.kandidat
    ADD CONSTRAINT kandidat_kandidat_agama_fkey FOREIGN KEY (kandidat_agama_id) REFERENCES public.agama(agama_id);


--
-- TOC entry 4824 (class 2606 OID 172281)
-- Name: kandidat kandidat_kandidat_dapil_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.kandidat
    ADD CONSTRAINT kandidat_kandidat_dapil_fkey FOREIGN KEY (kandidat_dapil_id) REFERENCES public.dapil(dapil_id);


--
-- TOC entry 4825 (class 2606 OID 172286)
-- Name: kandidat kandidat_kandidat_jenis_pemilihan_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.kandidat
    ADD CONSTRAINT kandidat_kandidat_jenis_pemilihan_fkey FOREIGN KEY (kandidat_jenis_pemilihan_id) REFERENCES public.jenis_pemilihan(jenis_pemilihan_id);


--
-- TOC entry 4826 (class 2606 OID 172291)
-- Name: kandidat kandidat_kandidat_partai_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.kandidat
    ADD CONSTRAINT kandidat_kandidat_partai_fkey FOREIGN KEY (kandidat_partai_id) REFERENCES public.partai(partai_id);


--
-- TOC entry 4827 (class 2606 OID 172296)
-- Name: kandidat kandidat_kandidat_posisi_calon_tetap_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.kandidat
    ADD CONSTRAINT kandidat_kandidat_posisi_calon_tetap_fkey FOREIGN KEY (kandidat_posisi_calon_tetap_id) REFERENCES public.posisi_calon_tetap(posisi_calon_tetap_id);


--
-- TOC entry 4828 (class 2606 OID 172301)
-- Name: kandidat kandidat_kandidat_role_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.kandidat
    ADD CONSTRAINT kandidat_kandidat_role_fkey FOREIGN KEY (kandidat_role_id) REFERENCES public.roles(role_id);


--
-- TOC entry 4829 (class 2606 OID 172306)
-- Name: logistik logistik_logistik_relawan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.logistik
    ADD CONSTRAINT logistik_logistik_relawan_id_fkey FOREIGN KEY (logistik_relawan_id) REFERENCES public.relawan(relawan_id);


--
-- TOC entry 4830 (class 2606 OID 172311)
-- Name: pemakaian_logistik pemakaian_logistik_pemakaian_logistik_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.pemakaian_logistik
    ADD CONSTRAINT pemakaian_logistik_pemakaian_logistik_id_fkey FOREIGN KEY (pemakaian_logistik_id) REFERENCES public.logistik(logistik_id);


--
-- TOC entry 4831 (class 2606 OID 172316)
-- Name: pemakaian_logistik pemakaian_logistik_pemakaian_relawan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.pemakaian_logistik
    ADD CONSTRAINT pemakaian_logistik_pemakaian_relawan_id_fkey FOREIGN KEY (pemakaian_relawan_id) REFERENCES public.relawan(relawan_id);


--
-- TOC entry 4832 (class 2606 OID 172321)
-- Name: quick_count quick_count_quick_count_relawan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.quick_count
    ADD CONSTRAINT quick_count_quick_count_relawan_id_fkey FOREIGN KEY (quick_count_relawan_id) REFERENCES public.relawan(relawan_id);


--
-- TOC entry 4833 (class 2606 OID 172326)
-- Name: relawan relawan_relawan_kandidat_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.relawan
    ADD CONSTRAINT relawan_relawan_kandidat_id_fkey FOREIGN KEY (relawan_kandidat_id) REFERENCES public.kandidat(kandidat_id);


--
-- TOC entry 4834 (class 2606 OID 172331)
-- Name: relawan relawan_relawan_role_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.relawan
    ADD CONSTRAINT relawan_relawan_role_fkey FOREIGN KEY (relawan_role_id) REFERENCES public.roles(role_id);


--
-- TOC entry 4835 (class 2606 OID 172336)
-- Name: users users_user_partai_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_user_partai_fkey FOREIGN KEY (user_partai_id) REFERENCES public.partai(partai_id);


--
-- TOC entry 4836 (class 2606 OID 172341)
-- Name: users users_user_role_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_user_role_fkey FOREIGN KEY (user_role_id) REFERENCES public.roles(role_id);


-- Completed on 2024-07-26 02:11:13

--
-- PostgreSQL database dump complete
--

