--
-- PostgreSQL database cluster dump
--

-- Started on 2024-07-03 06:39:46

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS;
CREATE ROLE zdn;
ALTER ROLE zdn WITH NOSUPERUSER INHERIT NOCREATEROLE CREATEDB LOGIN NOREPLICATION NOBYPASSRLS;

--
-- User Configurations
--








--
-- Databases
--

--
-- Database "template1" dump
--

-- \connect template1

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

-- Started on 2024-07-03 06:39:46

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

-- Completed on 2024-07-03 06:39:47

--
-- PostgreSQL database dump complete
--

--
-- Database "simkamp" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

-- Started on 2024-07-03 06:39:47

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
-- TOC entry 5018 (class 1262 OID 65574)
-- Name: simkamp; Type: DATABASE; Schema: -; Owner: zdn
--

CREATE DATABASE simkamp WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Indonesia.1252';


ALTER DATABASE simkamp OWNER TO zdn;

\connect simkamp

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
-- TOC entry 258 (class 1255 OID 114746)
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
-- TOC entry 246 (class 1255 OID 114745)
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
-- TOC entry 245 (class 1255 OID 106587)
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
-- TOC entry 224 (class 1259 OID 65690)
-- Name: agama; Type: TABLE; Schema: public; Owner: zdn
--

CREATE TABLE public.agama (
    agama_id integer NOT NULL,
    agama character varying(255)
);


ALTER TABLE public.agama OWNER TO zdn;

--
-- TOC entry 223 (class 1259 OID 65689)
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
-- Dependencies: 223
-- Name: agama_agama_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zdn
--

ALTER SEQUENCE public.agama_agama_id_seq OWNED BY public.agama.agama_id;


--
-- TOC entry 236 (class 1259 OID 73861)
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
-- TOC entry 235 (class 1259 OID 73860)
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
-- Dependencies: 235
-- Name: arus_kas_aruskas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zdn
--

ALTER SEQUENCE public.arus_kas_aruskas_id_seq OWNED BY public.arus_kas.aruskas_id;


--
-- TOC entry 234 (class 1259 OID 73845)
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
-- TOC entry 233 (class 1259 OID 73844)
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
-- Dependencies: 233
-- Name: calon_pemilih_calon_pemilih_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zdn
--

ALTER SEQUENCE public.calon_pemilih_calon_pemilih_id_seq OWNED BY public.calon_pemilih.calon_pemilih_id;


--
-- TOC entry 222 (class 1259 OID 65681)
-- Name: dapil; Type: TABLE; Schema: public; Owner: zdn
--

CREATE TABLE public.dapil (
    dapil_id integer NOT NULL,
    dapil_nama character varying(255),
    dapil_provinsi integer
);


ALTER TABLE public.dapil OWNER TO zdn;

--
-- TOC entry 221 (class 1259 OID 65680)
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
-- Dependencies: 221
-- Name: dapil_dapil_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zdn
--

ALTER SEQUENCE public.dapil_dapil_id_seq OWNED BY public.dapil.dapil_id;


--
-- TOC entry 226 (class 1259 OID 65698)
-- Name: jenis_pemilihan; Type: TABLE; Schema: public; Owner: zdn
--

CREATE TABLE public.jenis_pemilihan (
    jenis_pemilihan_id integer NOT NULL,
    jenis_pemilihan character varying(255)
);


ALTER TABLE public.jenis_pemilihan OWNER TO zdn;

--
-- TOC entry 225 (class 1259 OID 65697)
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
-- Dependencies: 225
-- Name: jenis_pemilihan_jenis_pemilihan_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zdn
--

ALTER SEQUENCE public.jenis_pemilihan_jenis_pemilihan_id_seq OWNED BY public.jenis_pemilihan.jenis_pemilihan_id;


--
-- TOC entry 230 (class 1259 OID 73767)
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
-- TOC entry 229 (class 1259 OID 73766)
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
-- Dependencies: 229
-- Name: kandidat_kandidat_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zdn
--

ALTER SEQUENCE public.kandidat_kandidat_id_seq OWNED BY public.kandidat.kandidat_id;


--
-- TOC entry 238 (class 1259 OID 73875)
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
-- TOC entry 237 (class 1259 OID 73874)
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
-- Dependencies: 237
-- Name: logistik_logistik_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zdn
--

ALTER SEQUENCE public.logistik_logistik_id_seq OWNED BY public.logistik.logistik_id;


--
-- TOC entry 218 (class 1259 OID 65626)
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
-- TOC entry 217 (class 1259 OID 65625)
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
-- Dependencies: 217
-- Name: partai_partai_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zdn
--

ALTER SEQUENCE public.partai_partai_id_seq OWNED BY public.partai.partai_id;


--
-- TOC entry 240 (class 1259 OID 73906)
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
-- TOC entry 239 (class 1259 OID 73905)
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
-- Dependencies: 239
-- Name: pemakaian_logistik_pemakaian_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zdn
--

ALTER SEQUENCE public.pemakaian_logistik_pemakaian_id_seq OWNED BY public.pemakaian_logistik.pemakaian_id;


--
-- TOC entry 228 (class 1259 OID 65705)
-- Name: posisi_calon_tetap; Type: TABLE; Schema: public; Owner: zdn
--

CREATE TABLE public.posisi_calon_tetap (
    posisi_calon_tetap_id integer NOT NULL,
    posisi_calon_tetap character varying(255)
);


ALTER TABLE public.posisi_calon_tetap OWNER TO zdn;

--
-- TOC entry 227 (class 1259 OID 65704)
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
-- Dependencies: 227
-- Name: posisis_calon_tetap_calon_tetap_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zdn
--

ALTER SEQUENCE public.posisis_calon_tetap_calon_tetap_id_seq OWNED BY public.posisi_calon_tetap.posisi_calon_tetap_id;


--
-- TOC entry 244 (class 1259 OID 114727)
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
-- TOC entry 243 (class 1259 OID 114726)
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
-- Dependencies: 243
-- Name: quick_count_quick_count_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zdn
--

ALTER SEQUENCE public.quick_count_quick_count_id_seq OWNED BY public.quick_count.quick_count_id;


--
-- TOC entry 232 (class 1259 OID 73810)
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
-- TOC entry 231 (class 1259 OID 73809)
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
-- Dependencies: 231
-- Name: relawan_relawan_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zdn
--

ALTER SEQUENCE public.relawan_relawan_id_seq OWNED BY public.relawan.relawan_id;


--
-- TOC entry 216 (class 1259 OID 65587)
-- Name: roles; Type: TABLE; Schema: public; Owner: zdn
--

CREATE TABLE public.roles (
    role_id integer NOT NULL,
    role character varying(255),
    role_deskripsi character varying(255)
);


ALTER TABLE public.roles OWNER TO zdn;

--
-- TOC entry 215 (class 1259 OID 65586)
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
-- Dependencies: 215
-- Name: roles_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zdn
--

ALTER SEQUENCE public.roles_role_id_seq OWNED BY public.roles.role_id;


--
-- TOC entry 242 (class 1259 OID 90151)
-- Name: token_blacklist; Type: TABLE; Schema: public; Owner: zdn
--

CREATE TABLE public.token_blacklist (
    id integer NOT NULL,
    token text NOT NULL,
    expiry timestamp without time zone NOT NULL
);


ALTER TABLE public.token_blacklist OWNER TO zdn;

--
-- TOC entry 241 (class 1259 OID 90150)
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
-- Dependencies: 241
-- Name: token_blacklist_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zdn
--

ALTER SEQUENCE public.token_blacklist_id_seq OWNED BY public.token_blacklist.id;


--
-- TOC entry 220 (class 1259 OID 65660)
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
-- TOC entry 219 (class 1259 OID 65659)
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
-- Dependencies: 219
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zdn
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 4765 (class 2604 OID 65693)
-- Name: agama agama_id; Type: DEFAULT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.agama ALTER COLUMN agama_id SET DEFAULT nextval('public.agama_agama_id_seq'::regclass);


--
-- TOC entry 4771 (class 2604 OID 73864)
-- Name: arus_kas aruskas_id; Type: DEFAULT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.arus_kas ALTER COLUMN aruskas_id SET DEFAULT nextval('public.arus_kas_aruskas_id_seq'::regclass);


--
-- TOC entry 4770 (class 2604 OID 73848)
-- Name: calon_pemilih calon_pemilih_id; Type: DEFAULT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.calon_pemilih ALTER COLUMN calon_pemilih_id SET DEFAULT nextval('public.calon_pemilih_calon_pemilih_id_seq'::regclass);


--
-- TOC entry 4764 (class 2604 OID 65684)
-- Name: dapil dapil_id; Type: DEFAULT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.dapil ALTER COLUMN dapil_id SET DEFAULT nextval('public.dapil_dapil_id_seq'::regclass);


--
-- TOC entry 4766 (class 2604 OID 65701)
-- Name: jenis_pemilihan jenis_pemilihan_id; Type: DEFAULT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.jenis_pemilihan ALTER COLUMN jenis_pemilihan_id SET DEFAULT nextval('public.jenis_pemilihan_jenis_pemilihan_id_seq'::regclass);


--
-- TOC entry 4768 (class 2604 OID 73770)
-- Name: kandidat kandidat_id; Type: DEFAULT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.kandidat ALTER COLUMN kandidat_id SET DEFAULT nextval('public.kandidat_kandidat_id_seq'::regclass);


--
-- TOC entry 4772 (class 2604 OID 73878)
-- Name: logistik logistik_id; Type: DEFAULT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.logistik ALTER COLUMN logistik_id SET DEFAULT nextval('public.logistik_logistik_id_seq'::regclass);


--
-- TOC entry 4762 (class 2604 OID 65629)
-- Name: partai partai_id; Type: DEFAULT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.partai ALTER COLUMN partai_id SET DEFAULT nextval('public.partai_partai_id_seq'::regclass);


--
-- TOC entry 4773 (class 2604 OID 73909)
-- Name: pemakaian_logistik pemakaian_id; Type: DEFAULT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.pemakaian_logistik ALTER COLUMN pemakaian_id SET DEFAULT nextval('public.pemakaian_logistik_pemakaian_id_seq'::regclass);


--
-- TOC entry 4767 (class 2604 OID 65708)
-- Name: posisi_calon_tetap posisi_calon_tetap_id; Type: DEFAULT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.posisi_calon_tetap ALTER COLUMN posisi_calon_tetap_id SET DEFAULT nextval('public.posisis_calon_tetap_calon_tetap_id_seq'::regclass);


--
-- TOC entry 4775 (class 2604 OID 114730)
-- Name: quick_count quick_count_id; Type: DEFAULT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.quick_count ALTER COLUMN quick_count_id SET DEFAULT nextval('public.quick_count_quick_count_id_seq'::regclass);


--
-- TOC entry 4769 (class 2604 OID 73813)
-- Name: relawan relawan_id; Type: DEFAULT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.relawan ALTER COLUMN relawan_id SET DEFAULT nextval('public.relawan_relawan_id_seq'::regclass);


--
-- TOC entry 4761 (class 2604 OID 65590)
-- Name: roles role_id; Type: DEFAULT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.roles ALTER COLUMN role_id SET DEFAULT nextval('public.roles_role_id_seq'::regclass);


--
-- TOC entry 4774 (class 2604 OID 90154)
-- Name: token_blacklist id; Type: DEFAULT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.token_blacklist ALTER COLUMN id SET DEFAULT nextval('public.token_blacklist_id_seq'::regclass);


--
-- TOC entry 4763 (class 2604 OID 65663)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 4992 (class 0 OID 65690)
-- Dependencies: 224
-- Data for Name: agama; Type: TABLE DATA; Schema: public; Owner: zdn
--

COPY public.agama (agama_id, agama) FROM stdin;
1	Islam
2	Hindu
\.


--
-- TOC entry 5004 (class 0 OID 73861)
-- Dependencies: 236
-- Data for Name: arus_kas; Type: TABLE DATA; Schema: public; Owner: zdn
--

COPY public.arus_kas (aruskas_id, aruskas_kategori, aruskas_foto_kuitansi, aruskas_detail, aruskas_catatan, aruskas_jumlah, aruskas_relawan_id, aruskas_tanggal) FROM stdin;
2	Pengeluaran	images/1719305936316.jpeg	Pembelian Barang	Untuk pembelian logistik kaos	400000	7	26-06-2024
3	pemasukan	images/1719625881632.jpg	Pembelian Barang baru	Beli barang baju	20000	8	2024-06-29
5	pemasukan	images/1719751715224.jpg	Dana dari relawan	untuk uang kas	300000	11	2024-06-29
4	pemasukan	images/1719751977856.jpg	Dana dari relawan	untuk uang kas	2550000	11	2024-06-30
\.


--
-- TOC entry 5002 (class 0 OID 73845)
-- Dependencies: 234
-- Data for Name: calon_pemilih; Type: TABLE DATA; Schema: public; Owner: zdn
--

COPY public.calon_pemilih (calon_pemilih_id, calon_pemilih_nama, calon_pemilih_no_telp, calon_pemilih_foto, calon_pemilih_foto_ktp, calon_pemilih_provinsi, calon_pemilih_kab_kota, calon_pemilih_kecamatan, calon_pemilih_kelurahan, calon_pemilih_status, calon_pemilih_relawan_id) FROM stdin;
1	Zulllfikard	089615273503	images/1719299702589.jpg	images/1719299702590.jpeg	32	3201	3201010	3201010001	memilih	7
3	Rina Rini	0882133656123	images/1719620894686.jpg	images/1719620894686.jpeg	32	32.08	32.08.08	32.08.08.2009	memilih	8
5	Surtini	0882133656127	images/1719667283060.jpg	images/1719667283061.jpeg	18	18.09	18.09.09	18.09.09.2009	memilih	11
\.


--
-- TOC entry 4990 (class 0 OID 65681)
-- Dependencies: 222
-- Data for Name: dapil; Type: TABLE DATA; Schema: public; Owner: zdn
--

COPY public.dapil (dapil_id, dapil_nama, dapil_provinsi) FROM stdin;
1	Jawa Barat 1	32
3	SUMUT 1	12
\.


--
-- TOC entry 4994 (class 0 OID 65698)
-- Dependencies: 226
-- Data for Name: jenis_pemilihan; Type: TABLE DATA; Schema: public; Owner: zdn
--

COPY public.jenis_pemilihan (jenis_pemilihan_id, jenis_pemilihan) FROM stdin;
2	PILEG
4	PILKADA
\.


--
-- TOC entry 4998 (class 0 OID 73767)
-- Dependencies: 230
-- Data for Name: kandidat; Type: TABLE DATA; Schema: public; Owner: zdn
--

COPY public.kandidat (kandidat_id, kandidat_nama, kandidat_email, kandidat_password, kandidat_no_telp, kandidat_agama_id, kandidat_foto, kandidat_usia, kandidat_partai_id, kandidat_alamat, kandidat_admin_id, kandidat_dapil_id, kandidat_jenis_pemilihan_id, kandidat_posisi_calon_tetap_id, kandidat_jenis_kelamin, kandidat_role_id, kandidat_nomor_urut) FROM stdin;
3	Anies Rasyid Baswedan	aniesaaa@gmail.com	$2b$10$3KzumUGv4la8shmEvqozu.MjbgtD7ja2FIVLpEN7QKEt0RDG0YFgG	089615273508	1	images/1719239062527.jpg	50	3	Jl. Kuningan 158	6	1	2	3	laki-laki	4	1
6	Hasim	hasim@gmail.com	$2b$10$fTr6SV2wbHOICu8mar3SQ.avHHftHRVJ.U705SsAdImV3dPqwq/KC	089615273502	1	images/1719446087623.png	50	11	Jl. Kuningan 158	6	1	2	3	laki-laki	4	1
7	Anies Rasyid Baswedan 	anies@gmail.com	$2b$10$NUAVfNTDaYUGSGeoYjzCduKb9NyOvg8tPnvVqNMyv5YY8GldB3LB6	088213365615	1	\N	\N	\N	\N	7	\N	\N	\N	\N	\N	\N
9	Muhaimin	imin@gmail.com	$2b$10$UlWh2JpIkxDTTpLvUleRYe1lKHChg9Y.Viicqx2m65oQNRjFWviC6	088213365617	1	images/1719653644741.jpg	40	11	Jl.Kuningan	7	1	2	3	laki-laki	4	2
8	Anies Rasyid Baswedan	ans@gmail.com	$2b$10$NQJMygKEyP84rL12LIxGge6uJwF1L74/jw9EUhwsNCs7QM0u.xH0y	088213365616	1	images/1719657660315.jpg	50	11	Jl.Kuningan	7	3	2	3	laki-laki	4	1
\.


--
-- TOC entry 5006 (class 0 OID 73875)
-- Dependencies: 238
-- Data for Name: logistik; Type: TABLE DATA; Schema: public; Owner: zdn
--

COPY public.logistik (logistik_id, logistik_nama_atribut, logistik_satuan_unit, logistik_stok, logistik_total_harga, logistik_relawan_id) FROM stdin;
1	Baju	kg	12	120000	7
3	Hoodie	kg	2	120000	7
6	Banner	pcs	10	150000	11
7	Poster	pcs	100	100000	11
5	Baju Baru	pcs	1950	230000	10
\.


--
-- TOC entry 4986 (class 0 OID 65626)
-- Dependencies: 218
-- Data for Name: partai; Type: TABLE DATA; Schema: public; Owner: zdn
--

COPY public.partai (partai_id, partai_label, partai_nama, partai_nomor, partai_logo) FROM stdin;
2	PDIP	Partai Demokrasi Indonesia Perjuangan	1	images/1719082948184.png
3	GOLKAR	Golongan Karya	2	images/1719083638959.png
11	Nasdem	Nasional Demokrat	6	images/1719235696536.png
1	Demokrat	Demokrat	10	images/1719569458665.png
13	PKS	Partai Keadilan Sejahtera	13	images/1719571824670.png
\.


--
-- TOC entry 5008 (class 0 OID 73906)
-- Dependencies: 240
-- Data for Name: pemakaian_logistik; Type: TABLE DATA; Schema: public; Owner: zdn
--

COPY public.pemakaian_logistik (pemakaian_id, pemakaian_tanggal, pemakaian_jumlah, pemakaian_logistik_id, pemakaian_relawan_id) FROM stdin;
9	26-06-2024	10	3	7
10	2024-06-05	50	5	8
11	2024-06-29	5	6	11
\.


--
-- TOC entry 4996 (class 0 OID 65705)
-- Dependencies: 228
-- Data for Name: posisi_calon_tetap; Type: TABLE DATA; Schema: public; Owner: zdn
--

COPY public.posisi_calon_tetap (posisi_calon_tetap_id, posisi_calon_tetap) FROM stdin;
3	DPR RI
4	DPD RI
\.


--
-- TOC entry 5012 (class 0 OID 114727)
-- Dependencies: 244
-- Data for Name: quick_count; Type: TABLE DATA; Schema: public; Owner: zdn
--

COPY public.quick_count (quick_count_id, quick_count_provinsi, quick_count_kab_kota, quick_count_kecamatan, quick_count_kelurahan, quick_count_jumlah_suara, quick_count_relawan_id, quick_count_foto, quick_count_tps) FROM stdin;
1	32	3201	3201010	3201010001	20	7	images/1719331222844.jpg	109
3	21	21.72	21.72.03	21.72.03.1003	20	8	images/1719821181240.jpg	TPS 12
4	11	11.09	11.09.08	11.09.08.2008	20	11	images/1719667595719.jpg	TPS 110
\.


--
-- TOC entry 5000 (class 0 OID 73810)
-- Dependencies: 232
-- Data for Name: relawan; Type: TABLE DATA; Schema: public; Owner: zdn
--

COPY public.relawan (relawan_id, relawan_nama, relawan_email, relawan_password, relawan_no_telp, relawan_usia, relawan_jenis_kelamin, relawan_foto, relawan_provinsi_kode, relawan_kab_kota_kode, relawan_status, relawan_kandidat_id, relawan_role_id) FROM stdin;
7	Muhaimin Iskandar S.Pd	caki@gmail.com	$2b$10$wMHeaP.YSifiipSSYEBcn.20bhdQK06O0DTdwabezbY2fwx5ari4a	089615273501	40	laki-laki	images/1719296422668.jpg	32	3201	aktif	3	5
8	Dedy Kusnadi	dedy@gmail.com	$2b$10$p.xl43yn1kdScaSzjEl3KeFrfsGIlLf1WqM.NqeXTlD9h36ycI9PK	088213365611	44	laki-laki	images/1719614380521.jpg	18	18.01	aktif	7	5
9	Kusnandar	kus@gmail.com	$2b$10$0CG4kfxRe9eCv4Li0QsT5Ofy.l62fc5MKkNTwyZNVS6Vx8Iu4dvyO	088213365612	45	laki-laki	images/1719615419972.jpg	17	17.09	aktif	7	5
10	Imin	imn@gmail.com	$2b$10$7Zc4AAF30bNdmL0qsQjE9uI0gMXyTAF1QJGT24A2M6CgIF0LHSg/i	088213365613	30	laki-laki	images/1719655671118.jpg	17	17.09	aktif	9	5
11	Wahyudi Set	cn@gmail.com	$2a$12$yMy/fNrT3nxYbGGHwJwNZOtTd1XXxYe20zTmVRCXFsSNFmapIsPLy	088213365610	22	laki-laki	images/1719684844758.jpg	17	17.08	aktif	8	5
\.


--
-- TOC entry 4984 (class 0 OID 65587)
-- Dependencies: 216
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: zdn
--

COPY public.roles (role_id, role, role_deskripsi) FROM stdin;
1	admin-partai	Administrator partai dengan akses khusus
2	administrator	Administrator dengan akses penuh ke sistem
4	kandidat	Kandidat anggota partai
5	relawan	Relawan anggota sukarela kandidat
\.


--
-- TOC entry 5010 (class 0 OID 90151)
-- Dependencies: 242
-- Data for Name: token_blacklist; Type: TABLE DATA; Schema: public; Owner: zdn
--

COPY public.token_blacklist (id, token, expiry) FROM stdin;
1	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzE5MDcwNjY2LCJleHAiOjE3MTkxNTcwNjZ9.BeEY6OmxquwootMkqwMUsrnpswVxN_7Yz7OxBViNM3w	2024-06-22 22:53:38.503
2	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzE5MDcwNzU5LCJleHAiOjE3MTkxNTcxNTl9.PqYwYNmL9KRGgMX5cY5fT_e_fYM2NJNolCCv03Tcbzs	2024-06-22 22:54:40.565
3	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzE5MDcwODIxLCJleHAiOjE3MTkxNTcyMjF9.cGMmjtZTmzsQ95m9yGpIHtY653GWUmOsy3m_TJbWLBU	2024-06-22 23:06:11.942
4	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6ImFkbWluaXN0cmF0b3IiLCJpYXQiOjE3MTkwNzE1NDIsImV4cCI6MTcxOTE1Nzk0Mn0.jS7_q6AjxdExrcKZn46GI3eJ42fy5y4xkeR3NJOcWWo	2024-06-22 23:40:53.208
5	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzE5MDczNTYxLCJleHAiOjE3MTkxNTk5NjF9.pymYS7o7pmaI7_6ARMvIULwEN7MsE9uRXzCvOX62grk	2024-06-22 23:42:29.925
6	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6ImFkbWluaXN0cmF0b3IiLCJpYXQiOjE3MTkxODA1NDAsImV4cCI6MTcxOTI2Njk0MH0.AEDghk4Ek1tuqFmW27I0BgI40Qy3wyGdmWOIFwy1PsY	2024-06-24 05:26:44.194
7	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6ImFkbWluaXN0cmF0b3IiLCJpYXQiOjE3MTkxODA3MTQsImV4cCI6MTcxOTI2NzExNH0.Q2m2M54NfIoOBCLc6ntp6scirPsoTOuIq4bbaKc-icM	2024-06-24 21:17:57.667
8	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Niwicm9sZSI6ImFkbWluLXBhcnRhaSIsImlhdCI6MTcxOTIzNzc5NywiZXhwIjoxNzE5MzI0MTk3fQ.RD1qAsys-dh2jMdjU8fdL3IcGJRiNBZnnhk87khCxSc	2024-06-24 22:12:51.53
9	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Niwicm9sZSI6ImFkbWluLXBhcnRhaSIsImlhdCI6MTcxOTI0MTA4MywiZXhwIjoxNzE5MzI3NDgzfQ.aycLtt3RLZkbRBxv58QSEiS3X9se8iBS2qwTo5iV8Rs	2024-06-24 22:19:19.032
10	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Niwicm9sZSI6ImFkbWluLXBhcnRhaSIsImlhdCI6MTcxOTI0Mjg4OCwiZXhwIjoxNzE5MzI5Mjg4fQ.aD1zhyRzN4uKW-8K_9Q2cInFDuV6VEh-pLInHG7BL1c	2024-06-24 22:52:04.388
11	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6ImthbmRpZGF0IiwiaWF0IjoxNzE5MjQzNTE1LCJleHAiOjE3MTkzMjk5MTV9.O9E4ZZjhwg_uaLNbSQspVZeeQAbMjGDw2olzm-WnM68	2024-06-24 23:06:49.73
12	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6ImthbmRpZGF0IiwiaWF0IjoxNzE5MjQ0MzE0LCJleHAiOjE3MTkzMzA3MTR9.vrXOo1B9Zf4b38gljmrrY_PJgLI9gNBNzkKWE4L-iUU	2024-06-24 23:15:01.174
13	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Niwicm9sZSI6ImFkbWluLXBhcnRhaSIsImlhdCI6MTcxOTI0NDgwOSwiZXhwIjoxNzE5MzMxMjA5fQ.neLMDoOQFv4bp19K2HBLjwhAQcmz5AmIuPCJBQVKEic	2024-06-24 23:24:33.797
14	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6ImthbmRpZGF0IiwiaWF0IjoxNzE5MjQ1Mzk5LCJleHAiOjE3MTkzMzE3OTl9.oGs51OWEkvzyvi07QUZa07Tf6ESoKUfeVOFf6EnEfb4	2024-06-25 13:10:11.045
15	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nywicm9sZSI6ImthbmRpZGF0IiwiaWF0IjoxNzE5Mjk1ODY2LCJleHAiOjE3MTkzODIyNjZ9.uhRBmZ3mzsSoWcNDX3bpVfYKmUvHCM68v0WG4Fq4BQM	2024-06-25 13:27:05.937
16	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6ImthbmRpZGF0IiwiaWF0IjoxNzE5Mjk2MDI0LCJleHAiOjE3MTkzODI0MjR9.DTqWwyY3n_y59ZULBiOAiWDt9ZEnNXi2X6aNsh85sl4	2024-06-25 13:35:42.354
17	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Niwicm9sZSI6ImFkbWluLXBhcnRhaSIsImlhdCI6MTcxOTQ0MjE1MiwiZXhwIjoxNzE5NTI4NTUyfQ.oLcuVPIbK5Hi4oSgpdw4JI1sj9pjlJc-TjsNCWJmSJg	2024-06-27 06:06:04.751
18	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6ImFkbWluaXN0cmF0b3IiLCJpYXQiOjE3MTk0NDI1MjcsImV4cCI6MTcxOTUyODkyN30.SDFWHky81l2LW9fsIlchlFZHBxjQt4l2q9ptPtRuyaI	2024-06-27 06:10:59.17
19	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6ImFkbWluaXN0cmF0b3IiLCJpYXQiOjE3MTk0NDI5MTUsImV4cCI6MTcxOTUyOTMxNX0.g45_eEGWxx9jEPCM9o8WBet7HPuCA2vAWfYrdcu6Jhw	2024-06-27 06:47:28.502
20	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Niwicm9sZSI6ImFkbWluLXBhcnRhaSIsImlhdCI6MTcxOTQ0NDc1NywiZXhwIjoxNzE5NTMxMTU3fQ.nXDrr8CUc1x3YTFZOKh0QHh7ZFansCZsnRKwgEXbN1s	2024-06-27 06:49:52.853
21	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6ImFkbWluaXN0cmF0b3IiLCJpYXQiOjE3MTk0NDQ5MDEsImV4cCI6MTcxOTUzMTMwMX0.vMz4ANcNQqE1g6D_WyXFjquv-9kRTOXus4EuPFBCXt0	2024-06-27 07:03:43.854
22	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Niwicm9sZSI6ImFkbWluLXBhcnRhaSIsImlhdCI6MTcxOTQ0NTcyOSwiZXhwIjoxNzE5NTMyMTI5fQ.htvY964JEeaLcHTEshJT-Jj9mzU9ctGpIqE-MF9hCuA	2024-06-27 13:09:38.997
23	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6ImFkbWluaXN0cmF0b3IiLCJpYXQiOjE3MTk0OTYwMzMsImV4cCI6MTcxOTU4MjQzM30.HhSu4HIBUdaPgoyPZpjvCDoU83RbBjEoRzJBhO8ugSY	2024-06-27 21:13:07.221
24	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6ImFkbWluaXN0cmF0b3IiLCJpYXQiOjE3MTk1MjY1ODAsImV4cCI6MTcxOTYxMjk4MH0.-LqYaRrWos02-iWyEbELbXQ3_qewzS3Iq1_djgg6Phs	2024-06-28 20:23:09.406
25	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nywicm9sZSI6ImFkbWluLXBhcnRhaSIsImlhdCI6MTcxOTU4MDEwMSwiZXhwIjoxNzE5NjY2NTAxfQ.TMjwZ34XyTu9fFOFmHk4HJypEp_XPSFKPl8ECP8GRhc	2024-06-28 20:48:06.836
26	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6ImFkbWluaXN0cmF0b3IiLCJpYXQiOjE3MTk1ODE1OTksImV4cCI6MTcxOTY2Nzk5OX0.szJgFQFleirDE3XDQCLJVP5Vt75BJXaWPGFbJxNFyvM	2024-06-28 21:04:09.001
27	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nywicm9sZSI6ImFkbWluLXBhcnRhaSIsImlhdCI6MTcxOTU4MjU2NCwiZXhwIjoxNzE5NjY4OTY0fQ.7rRTRcewkZ21dyOITonlui0YmnjDckUcIc_HOXekewk	2024-06-28 23:06:42.31
28	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nywicm9sZSI6ImthbmRpZGF0IiwiaWF0IjoxNzE5NTg5OTE5LCJleHAiOjE3MTk2NzYzMTl9.yxmcu9mvZiGezpEVhsCdAyC7WDc_IO5g7Svg0Vc4SS4	2024-06-29 06:28:02.666
29	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwicm9sZSI6InJlbGF3YW4iLCJpYXQiOjE3MTk2MTc1NTIsImV4cCI6MTcxOTcwMzk1Mn0.8InvzFYE3jMUuvzF5RCuI5Pokee3Gyk5XDeaTzo3aTs	2024-06-29 11:41:57.785
30	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nywicm9sZSI6ImFkbWluLXBhcnRhaSIsImlhdCI6MTcxOTYzNTIzNCwiZXhwIjoxNzE5NzIxNjM0fQ.eLZzGSalLcprCXbad7yFRMl99OYzTeQrlG70pwKI-y0	2024-06-29 11:43:00.807
31	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nywicm9sZSI6ImFkbWluLXBhcnRhaSIsImlhdCI6MTcxOTYzODM1MywiZXhwIjoxNzE5NzI0NzUzfQ.qS-wdp-4vq-olKRygurzFeH3Sz2FWswm62oNtw9oRJg	2024-06-29 14:18:28.699
32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nywicm9sZSI6ImFkbWluLXBhcnRhaSIsImlhdCI6MTcxOTY0NjE5MywiZXhwIjoxNzE5NzMyNTkzfQ.VAHxFdZxSBxhdEfT9shpOQw5Gq0pwW0sdwUl_ejaxOs	2024-06-29 16:40:43.754
33	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6ImFkbWluaXN0cmF0b3IiLCJpYXQiOjE3MTk2NTMxNTcsImV4cCI6MTcxOTczOTU1N30.Uc4_mDoDEJpQcyawtktl_Rit9TPSY7vKqzjG9pOsWiA	2024-06-29 16:43:10.454
34	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nywicm9sZSI6ImFkbWluLXBhcnRhaSIsImlhdCI6MTcxOTY1MzMxNiwiZXhwIjoxNzE5NzM5NzE2fQ.vWLD6uHfm8DJ0CHoE-tJZLHRJyhu_iTASIFcx3iC9QI	2024-06-29 17:03:47.306
35	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwicm9sZSI6ImthbmRpZGF0IiwiaWF0IjoxNzE5NjU0NTQ3LCJleHAiOjE3MTk3NDA5NDd9.Vw1jnhg3-ep8Tdh7tB7ubC2G9T0NueiHnH9cLAsO76U	2024-06-29 17:23:38
36	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwicm9sZSI6ImthbmRpZGF0IiwiaWF0IjoxNzE5NjU1NzMzLCJleHAiOjE3MTk3NDIxMzN9.zjwalAMhaKV92VGJn3V4ACen-ZCwhXDbd_6czR-Vxww	2024-06-29 18:07:03.31
37	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nywicm9sZSI6ImFkbWluLXBhcnRhaSIsImlhdCI6MTcxOTY1ODMzMiwiZXhwIjoxNzE5NzQ0NzMyfQ.mkce-ZMGmHN88FZCX1JBdoITCsTX-bHsI3ZolFkfcpY	2024-06-29 18:07:18.542
38	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwicm9sZSI6ImthbmRpZGF0IiwiaWF0IjoxNzE5NjU4NTY0LCJleHAiOjE3MTk3NDQ5NjR9.U20rXZwoPPRvT4OCyetbfgES00U9zMpab44WQz9ZZeM	2024-06-29 18:31:44.554
39	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nywicm9sZSI6ImFkbWluLXBhcnRhaSIsImlhdCI6MTcxOTY1OTgzNCwiZXhwIjoxNzE5NzQ2MjM0fQ.A5EM5cQqaHtf9mXHKCntnyv3BjCeDBO5o_9nE3oTSb4	2024-06-29 18:35:09.586
40	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwicm9sZSI6ImthbmRpZGF0IiwiaWF0IjoxNzE5NjYwMDczLCJleHAiOjE3MTk3NDY0NzN9.DjJmxxv-Q80o0AEefttjceILTA8AgV1F0oHsfSeTErs	2024-06-29 18:50:27.721
41	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwicm9sZSI6ImthbmRpZGF0IiwiaWF0IjoxNzE5NjYwOTgyLCJleHAiOjE3MTk3NDczODJ9.438iAmJYVDBor41mUZrRqPk5e5KJdGGuMC1KZRqLlxE	2024-06-29 19:33:33.309
42	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nywicm9sZSI6ImFkbWluLXBhcnRhaSIsImlhdCI6MTcxOTY2MzUyNiwiZXhwIjoxNzE5NzQ5OTI2fQ.DHhT5DIe90gNY88Q_Y8HA03XaItW207Abqmn8neLr5Q	2024-06-29 19:53:21.552
43	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwicm9sZSI6ImthbmRpZGF0IiwiaWF0IjoxNzE5NjY0NzE0LCJleHAiOjE3MTk3NTExMTR9.3GOy4spFX_dyZu6ZfCfcROBPMMT0ugIxepJoTDmVVYg	2024-06-29 20:00:49.678
44	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nywicm9sZSI6ImFkbWluLXBhcnRhaSIsImlhdCI6MTcxOTY2NTE1OCwiZXhwIjoxNzE5NzUxNTU4fQ.NAoAtXScbscswAa-TH4AEPu2Hbq1qb4YGAU2iMlE6Xg	2024-06-29 20:08:05.465
45	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwicm9sZSI6ImthbmRpZGF0IiwiaWF0IjoxNzE5NjY1NTk2LCJleHAiOjE3MTk3NTE5OTZ9.Y6X51lgAtE-MAf-uZX-ea_b3ai0WGeGSwVZdPJwMAbs	2024-06-29 20:14:13.669
46	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwicm9sZSI6InJlbGF3YW4iLCJpYXQiOjE3MTk2NjU5NjcsImV4cCI6MTcxOTc1MjM2N30.8rB1hGbgMbACVkvyUj3GkbGwuDVQXU3JXCYKmuh329U	2024-06-29 20:15:05.984
47	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInJvbGUiOiJyZWxhd2FuIiwiaWF0IjoxNzE5NjY2MDQxLCJleHAiOjE3MTk3NTI0NDF9.h4N91us3DNuBHE_hUGf6hn3ty8wiHUkvTFVWJQg55ys	2024-06-29 20:42:01.907
48	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwicm9sZSI6ImthbmRpZGF0IiwiaWF0IjoxNzE5NjY3NjM1LCJleHAiOjE3MTk3NTQwMzV9.2t4OoxmlcC-KwNJ2MZk-SRAlcExaOYhEs7iLESRGzfc	2024-06-29 21:55:25.308
49	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nywicm9sZSI6ImFkbWluLXBhcnRhaSIsImlhdCI6MTcxOTY3MjA3MSwiZXhwIjoxNzE5NzU4NDcxfQ.pHalMt6DdzMybYEQVBl611L2mtQDnjmFmUow0KMyRLA	2024-06-29 22:04:17.247
82	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInJvbGUiOiJyZWxhd2FuIiwiaWF0IjoxNzE5NjgyODYzLCJleHAiOjE3MTk3NjkyNjN9.jCipxcR5cH2ZGaMALvbSQPxzAtuNwCF_6BtdqsNiqLc	2024-06-30 01:18:40.412
83	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwicm9sZSI6ImthbmRpZGF0IiwiaWF0IjoxNzE5Njg0MjI4LCJleHAiOjE3MTk3NzA2Mjh9.-kPwbK7kGg1N6w1_kYTIU9rlFdtpAuJZROtJj7wdxGY	2024-06-30 01:21:13.181
84	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInJvbGUiOiJyZWxhd2FuIiwiaWF0IjoxNzE5Njg0NTM2LCJleHAiOjE3MTk3NzA5MzZ9.SQhljQ_GPE0kQlr8LHLPMtat2iWwqTk-EiQuuEJUH4M	2024-06-30 01:29:19.863
85	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInJvbGUiOiJyZWxhd2FuIiwiaWF0IjoxNzE5Njg0OTA3LCJleHAiOjE3MTk3NzEzMDd9.XPAENf885CPtsoPCU7wySPcrfnBGk3bPMQPHl0nxMNw	2024-06-30 01:49:34.745
86	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nywicm9sZSI6ImFkbWluLXBhcnRhaSIsImlhdCI6MTcxOTY4NjA4MywiZXhwIjoxNzE5NzcyNDgzfQ.BRN-7pNNCvBMO7xB5DfokVKEysjl-vQDco8hZGaIWSQ	2024-06-30 01:59:56.97
87	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nywicm9sZSI6ImFkbWluLXBhcnRhaSIsImlhdCI6MTcxOTY4NjcxMCwiZXhwIjoxNzE5NzczMTEwfQ.Qx6IDLS6F2kTRl99ngWkF9fNtnDwr7TMydrBLN9eFJM	2024-06-30 19:21:30.232
88	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nywicm9sZSI6ImFkbWluLXBhcnRhaSIsImlhdCI6MTcxOTc0OTIwOSwiZXhwIjoxNzE5ODM1NjA5fQ.pt5rIQhTXHLiDUBEXn3JxslMlWggGKhD-8qPOBOt2GM	2024-06-30 19:25:59.202
89	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nywicm9sZSI6ImFkbWluLXBhcnRhaSIsImlhdCI6MTcxOTc0OTQ3NCwiZXhwIjoxNzE5ODM1ODc0fQ.SEH1h-abSly4LAIc3OqYomd_QHM2VDdulOQ4h7J6x1Y	2024-06-30 19:31:05.669
90	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nywicm9sZSI6ImFkbWluLXBhcnRhaSIsImlhdCI6MTcxOTc0OTc4MiwiZXhwIjoxNzE5ODM2MTgyfQ._LFCot-TEyhaEiUxgS7cw1NpR2U3IK_ReVqv05QuRxA	2024-06-30 19:55:46.049
91	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nywicm9sZSI6ImFkbWluLXBhcnRhaSIsImlhdCI6MTcxOTc1MTI1NywiZXhwIjoxNzE5ODM3NjU3fQ.53ZP4OIQ-G8l9YdIwv4jxCUz8THDP53zvld5OzLEsYs	2024-06-30 20:02:17.202
92	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInJvbGUiOiJyZWxhd2FuIiwiaWF0IjoxNzE5NzUxNjQ2LCJleHAiOjE3MTk4MzgwNDZ9.O_QjF4VXGny5FGhQFykJaTlWROZF0Ns-yr3LF3W127A	2024-06-30 22:25:27.474
93	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nywicm9sZSI6ImFkbWluLXBhcnRhaSIsImlhdCI6MTcxOTc2MDIzOCwiZXhwIjoxNzE5ODQ2NjM4fQ.f5ijvI1Gx_Dczt02nsbmMVd7trSI7gDcKWlq-4IWe-Q	2024-07-01 12:05:49.314
94	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwicm9sZSI6ImthbmRpZGF0IiwiaWF0IjoxNzE5ODA5NDg3LCJleHAiOjE3MTk4OTU4ODd9.IuQU6Cwv_OLidhXrcpW07FwbI7DKM2XQewU9f2fABsc	2024-07-01 12:08:51.777
95	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInJvbGUiOiJyZWxhd2FuIiwiaWF0IjoxNzE5ODA5NjQzLCJleHAiOjE3MTk4OTYwNDN9.l3SxnjVG73HizGdTCPEt9-BI3of70coRtVOmFhmDimc	2024-07-01 12:34:19.573
128	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nywicm9sZSI6ImFkbWluLXBhcnRhaSIsImlhdCI6MTcxOTgyMDcxMSwiZXhwIjoxNzE5OTA3MTExfQ.vUeSuic4W05GnfXRhGYXWGo7MFl724RoLN7yTuC-wt4	2024-07-01 16:39:33.391
129	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nywicm9sZSI6ImFkbWluLXBhcnRhaSIsImlhdCI6MTcxOTgyNTkyNywiZXhwIjoxNzE5OTEyMzI3fQ.zCYGprkQwFpHGzDt5L3v0eG17rkf25oiS3sc34JTEHw	2024-07-01 16:41:38.987
130	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwicm9sZSI6ImthbmRpZGF0IiwiaWF0IjoxNzE5ODI2MDExLCJleHAiOjE3MTk5MTI0MTF9.chEelZ-6RBf1XN-E6OYYdSZaHMvtUyfz-L-lUL4Orh8	2024-07-01 16:48:25.398
131	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nywicm9sZSI6ImFkbWluLXBhcnRhaSIsImlhdCI6MTcxOTgyNjQ4NywiZXhwIjoxNzE5OTEyODg3fQ.YgfAhYNjCgSqAzcgaTAl_6C19Z66AmJIHoZSRUcZpSo	2024-07-01 16:53:03.911
132	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwicm9sZSI6ImthbmRpZGF0IiwiaWF0IjoxNzE5ODI2Njk4LCJleHAiOjE3MTk5MTMwOTh9.hvfZN_ZCLugvoyX490qY6lpzqjqlEHYya_nnqPYRBE0	2024-07-01 16:59:30.435
133	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInJvbGUiOiJyZWxhd2FuIiwiaWF0IjoxNzE5ODI3MDg1LCJleHAiOjE3MTk5MTM0ODV9.cZPTyhKvLcc8RNDgAeI-Zy7uEA1KT6xYsTDfES8DtwA	2024-07-01 21:02:03.412
134	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nywicm9sZSI6ImFkbWluLXBhcnRhaSIsImlhdCI6MTcxOTg0MTYzNywiZXhwIjoxNzE5OTI4MDM3fQ.JgbnCj9MawNbP_KiinJWFPEgS7RbCn0ylioHEuCs4SE	2024-07-01 21:10:12.076
135	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6ImFkbWluaXN0cmF0b3IiLCJpYXQiOjE3MTk4NDIxMjcsImV4cCI6MTcxOTkyODUyN30.msqfS262sbYUqJ0r6ue8U575R1aAcEVT1wToxBByVqQ	2024-07-01 21:15:03.341
168	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nywicm9sZSI6ImFkbWluLXBhcnRhaSIsImlhdCI6MTcxOTkyODA0NSwiZXhwIjoxNzIwMDE0NDQ1fQ.I9FnNWSXHTKrZ1X4b-cZfRx4KGzlaJfKfZ2zALowCQc	2024-07-02 21:05:06.207
169	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6ImFkbWluaXN0cmF0b3IiLCJpYXQiOjE3MTk5MzAyMzQsImV4cCI6MTcyMDAxNjYzNH0.CuDVMW8NKHIYXSfRtK60e9lqR__RmeHKzpJRIA6L6vA	2024-07-02 21:39:26.455
\.


--
-- TOC entry 4988 (class 0 OID 65660)
-- Dependencies: 220
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: zdn
--

COPY public.users (user_id, user_nama, user_email, user_password, user_no_telp, user_partai_id, user_role_id) FROM stdin;
4	Susilo	demokrat@gmail.com	$2b$10$rD1yMNfMml./d/EaBpfq1uzOQVfBYmPhQuYiCAt8ymTaQkybA.06G	089615273507	2	1
5	ADMIN SISKAMP 2024	pemilunow@gmail.com	$2b$10$5VqhKfE6b6tDM1q3PHXbjuie6InzfDNbrIngzsVjo64a1fYNfomku	089615273507	\N	1
3	SBY	simkamp@gmail.com	$2b$10$e/s7LKIhoHj/X.mfLfp7ROG7X6X85D3ApJJ2ISPiSupKPnqPRdYi2	089615273507	\N	2
6	Surya Paloh	spaloh@gmail.com	$2b$10$KDlA.RZzATj3lhJb9Iqn4OQb30rxDwuEAUwyXRyov8vgvEWoWroc2	089615273507	11	1
8	Suwardi	swr@gmail.com	$2b$10$guG7b1AtfveiOzEMQuxZgOfCETt3EJmJopfMONp6/CcasRxvFEjRu	089615271235	3	1
7	Basuki Achmad Spd	bsk@gmail.com	$2b$10$k8P7qwe1gZMyWM.fivO/Aewj64pBrThLzCOn5w2LU1x8Innkf2LNq	089615271234	11	1
\.


--
-- TOC entry 5034 (class 0 OID 0)
-- Dependencies: 223
-- Name: agama_agama_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zdn
--

SELECT pg_catalog.setval('public.agama_agama_id_seq', 4, true);


--
-- TOC entry 5035 (class 0 OID 0)
-- Dependencies: 235
-- Name: arus_kas_aruskas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zdn
--

SELECT pg_catalog.setval('public.arus_kas_aruskas_id_seq', 5, true);


--
-- TOC entry 5036 (class 0 OID 0)
-- Dependencies: 233
-- Name: calon_pemilih_calon_pemilih_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zdn
--

SELECT pg_catalog.setval('public.calon_pemilih_calon_pemilih_id_seq', 5, true);


--
-- TOC entry 5037 (class 0 OID 0)
-- Dependencies: 221
-- Name: dapil_dapil_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zdn
--

SELECT pg_catalog.setval('public.dapil_dapil_id_seq', 3, true);


--
-- TOC entry 5038 (class 0 OID 0)
-- Dependencies: 225
-- Name: jenis_pemilihan_jenis_pemilihan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zdn
--

SELECT pg_catalog.setval('public.jenis_pemilihan_jenis_pemilihan_id_seq', 4, true);


--
-- TOC entry 5039 (class 0 OID 0)
-- Dependencies: 229
-- Name: kandidat_kandidat_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zdn
--

SELECT pg_catalog.setval('public.kandidat_kandidat_id_seq', 9, true);


--
-- TOC entry 5040 (class 0 OID 0)
-- Dependencies: 237
-- Name: logistik_logistik_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zdn
--

SELECT pg_catalog.setval('public.logistik_logistik_id_seq', 7, true);


--
-- TOC entry 5041 (class 0 OID 0)
-- Dependencies: 217
-- Name: partai_partai_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zdn
--

SELECT pg_catalog.setval('public.partai_partai_id_seq', 13, true);


--
-- TOC entry 5042 (class 0 OID 0)
-- Dependencies: 239
-- Name: pemakaian_logistik_pemakaian_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zdn
--

SELECT pg_catalog.setval('public.pemakaian_logistik_pemakaian_id_seq', 11, true);


--
-- TOC entry 5043 (class 0 OID 0)
-- Dependencies: 227
-- Name: posisis_calon_tetap_calon_tetap_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zdn
--

SELECT pg_catalog.setval('public.posisis_calon_tetap_calon_tetap_id_seq', 4, true);


--
-- TOC entry 5044 (class 0 OID 0)
-- Dependencies: 243
-- Name: quick_count_quick_count_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zdn
--

SELECT pg_catalog.setval('public.quick_count_quick_count_id_seq', 4, true);


--
-- TOC entry 5045 (class 0 OID 0)
-- Dependencies: 231
-- Name: relawan_relawan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zdn
--

SELECT pg_catalog.setval('public.relawan_relawan_id_seq', 11, true);


--
-- TOC entry 5046 (class 0 OID 0)
-- Dependencies: 215
-- Name: roles_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zdn
--

SELECT pg_catalog.setval('public.roles_role_id_seq', 8, true);


--
-- TOC entry 5047 (class 0 OID 0)
-- Dependencies: 241
-- Name: token_blacklist_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zdn
--

SELECT pg_catalog.setval('public.token_blacklist_id_seq', 169, true);


--
-- TOC entry 5048 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zdn
--

SELECT pg_catalog.setval('public.users_user_id_seq', 8, true);


--
-- TOC entry 4787 (class 2606 OID 65695)
-- Name: agama agama_pkey; Type: CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.agama
    ADD CONSTRAINT agama_pkey PRIMARY KEY (agama_id);


--
-- TOC entry 4809 (class 2606 OID 73868)
-- Name: arus_kas arus_kas_pkey; Type: CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.arus_kas
    ADD CONSTRAINT arus_kas_pkey PRIMARY KEY (aruskas_id);


--
-- TOC entry 4805 (class 2606 OID 73854)
-- Name: calon_pemilih calon_pemilih_calon_pemilih_no_telp_key; Type: CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.calon_pemilih
    ADD CONSTRAINT calon_pemilih_calon_pemilih_no_telp_key UNIQUE (calon_pemilih_no_telp);


--
-- TOC entry 4807 (class 2606 OID 73852)
-- Name: calon_pemilih calon_pemilih_pkey; Type: CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.calon_pemilih
    ADD CONSTRAINT calon_pemilih_pkey PRIMARY KEY (calon_pemilih_id);


--
-- TOC entry 4785 (class 2606 OID 65688)
-- Name: dapil dapil_pkey; Type: CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.dapil
    ADD CONSTRAINT dapil_pkey PRIMARY KEY (dapil_id);


--
-- TOC entry 4789 (class 2606 OID 65703)
-- Name: jenis_pemilihan jenis_pemilihan_pkey; Type: CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.jenis_pemilihan
    ADD CONSTRAINT jenis_pemilihan_pkey PRIMARY KEY (jenis_pemilihan_id);


--
-- TOC entry 4793 (class 2606 OID 73776)
-- Name: kandidat kandidat_kandidat_email_key; Type: CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.kandidat
    ADD CONSTRAINT kandidat_kandidat_email_key UNIQUE (kandidat_email);


--
-- TOC entry 4795 (class 2606 OID 73778)
-- Name: kandidat kandidat_kandidat_no_telp_key; Type: CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.kandidat
    ADD CONSTRAINT kandidat_kandidat_no_telp_key UNIQUE (kandidat_no_telp);


--
-- TOC entry 4797 (class 2606 OID 73774)
-- Name: kandidat kandidat_pkey; Type: CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.kandidat
    ADD CONSTRAINT kandidat_pkey PRIMARY KEY (kandidat_id);


--
-- TOC entry 4811 (class 2606 OID 73882)
-- Name: logistik logistik_pkey; Type: CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.logistik
    ADD CONSTRAINT logistik_pkey PRIMARY KEY (logistik_id);


--
-- TOC entry 4779 (class 2606 OID 65633)
-- Name: partai partai_pkey; Type: CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.partai
    ADD CONSTRAINT partai_pkey PRIMARY KEY (partai_id);


--
-- TOC entry 4813 (class 2606 OID 73911)
-- Name: pemakaian_logistik pemakaian_logistik_pkey; Type: CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.pemakaian_logistik
    ADD CONSTRAINT pemakaian_logistik_pkey PRIMARY KEY (pemakaian_id);


--
-- TOC entry 4791 (class 2606 OID 65710)
-- Name: posisi_calon_tetap posisis_calon_tetap_pkey; Type: CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.posisi_calon_tetap
    ADD CONSTRAINT posisis_calon_tetap_pkey PRIMARY KEY (posisi_calon_tetap_id);


--
-- TOC entry 4819 (class 2606 OID 114732)
-- Name: quick_count quick_count_pkey; Type: CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.quick_count
    ADD CONSTRAINT quick_count_pkey PRIMARY KEY (quick_count_id);


--
-- TOC entry 4799 (class 2606 OID 73817)
-- Name: relawan relawan_pkey; Type: CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.relawan
    ADD CONSTRAINT relawan_pkey PRIMARY KEY (relawan_id);


--
-- TOC entry 4801 (class 2606 OID 73819)
-- Name: relawan relawan_relawan_email_key; Type: CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.relawan
    ADD CONSTRAINT relawan_relawan_email_key UNIQUE (relawan_email);


--
-- TOC entry 4803 (class 2606 OID 73821)
-- Name: relawan relawan_relawan_no_telp_key; Type: CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.relawan
    ADD CONSTRAINT relawan_relawan_no_telp_key UNIQUE (relawan_no_telp);


--
-- TOC entry 4777 (class 2606 OID 65594)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (role_id);


--
-- TOC entry 4815 (class 2606 OID 90158)
-- Name: token_blacklist token_blacklist_pkey; Type: CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.token_blacklist
    ADD CONSTRAINT token_blacklist_pkey PRIMARY KEY (id);


--
-- TOC entry 4817 (class 2606 OID 90160)
-- Name: token_blacklist token_blacklist_token_key; Type: CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.token_blacklist
    ADD CONSTRAINT token_blacklist_token_key UNIQUE (token);


--
-- TOC entry 4781 (class 2606 OID 65667)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 4783 (class 2606 OID 65669)
-- Name: users users_user_email_key; Type: CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_user_email_key UNIQUE (user_email);


--
-- TOC entry 4837 (class 2620 OID 114748)
-- Name: pemakaian_logistik trg_adjust_logistik_stok; Type: TRIGGER; Schema: public; Owner: zdn
--

CREATE TRIGGER trg_adjust_logistik_stok AFTER UPDATE ON public.pemakaian_logistik FOR EACH ROW EXECUTE FUNCTION public.adjust_logistik_stok();


--
-- TOC entry 4838 (class 2620 OID 114747)
-- Name: pemakaian_logistik trg_restore_logistik_stok; Type: TRIGGER; Schema: public; Owner: zdn
--

CREATE TRIGGER trg_restore_logistik_stok AFTER DELETE ON public.pemakaian_logistik FOR EACH ROW EXECUTE FUNCTION public.restore_logistik_stok();


--
-- TOC entry 4839 (class 2620 OID 106588)
-- Name: pemakaian_logistik trg_update_logistik_stok; Type: TRIGGER; Schema: public; Owner: zdn
--

CREATE TRIGGER trg_update_logistik_stok AFTER INSERT ON public.pemakaian_logistik FOR EACH ROW EXECUTE FUNCTION public.update_logistik_stok();


--
-- TOC entry 4832 (class 2606 OID 73869)
-- Name: arus_kas arus_kas_aruskas_relawan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.arus_kas
    ADD CONSTRAINT arus_kas_aruskas_relawan_id_fkey FOREIGN KEY (aruskas_relawan_id) REFERENCES public.relawan(relawan_id);


--
-- TOC entry 4831 (class 2606 OID 73855)
-- Name: calon_pemilih calon_pemilih_calon_pemilih_relawan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.calon_pemilih
    ADD CONSTRAINT calon_pemilih_calon_pemilih_relawan_id_fkey FOREIGN KEY (calon_pemilih_relawan_id) REFERENCES public.relawan(relawan_id);


--
-- TOC entry 4822 (class 2606 OID 73789)
-- Name: kandidat kandidat_kandidat_admin_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.kandidat
    ADD CONSTRAINT kandidat_kandidat_admin_id_fkey FOREIGN KEY (kandidat_admin_id) REFERENCES public.users(user_id);


--
-- TOC entry 4823 (class 2606 OID 73779)
-- Name: kandidat kandidat_kandidat_agama_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.kandidat
    ADD CONSTRAINT kandidat_kandidat_agama_fkey FOREIGN KEY (kandidat_agama_id) REFERENCES public.agama(agama_id);


--
-- TOC entry 4824 (class 2606 OID 73794)
-- Name: kandidat kandidat_kandidat_dapil_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.kandidat
    ADD CONSTRAINT kandidat_kandidat_dapil_fkey FOREIGN KEY (kandidat_dapil_id) REFERENCES public.dapil(dapil_id);


--
-- TOC entry 4825 (class 2606 OID 73799)
-- Name: kandidat kandidat_kandidat_jenis_pemilihan_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.kandidat
    ADD CONSTRAINT kandidat_kandidat_jenis_pemilihan_fkey FOREIGN KEY (kandidat_jenis_pemilihan_id) REFERENCES public.jenis_pemilihan(jenis_pemilihan_id);


--
-- TOC entry 4826 (class 2606 OID 73784)
-- Name: kandidat kandidat_kandidat_partai_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.kandidat
    ADD CONSTRAINT kandidat_kandidat_partai_fkey FOREIGN KEY (kandidat_partai_id) REFERENCES public.partai(partai_id);


--
-- TOC entry 4827 (class 2606 OID 73804)
-- Name: kandidat kandidat_kandidat_posisi_calon_tetap_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.kandidat
    ADD CONSTRAINT kandidat_kandidat_posisi_calon_tetap_fkey FOREIGN KEY (kandidat_posisi_calon_tetap_id) REFERENCES public.posisi_calon_tetap(posisi_calon_tetap_id);


--
-- TOC entry 4828 (class 2606 OID 81958)
-- Name: kandidat kandidat_kandidat_role_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.kandidat
    ADD CONSTRAINT kandidat_kandidat_role_fkey FOREIGN KEY (kandidat_role_id) REFERENCES public.roles(role_id);


--
-- TOC entry 4833 (class 2606 OID 73883)
-- Name: logistik logistik_logistik_relawan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.logistik
    ADD CONSTRAINT logistik_logistik_relawan_id_fkey FOREIGN KEY (logistik_relawan_id) REFERENCES public.relawan(relawan_id);


--
-- TOC entry 4834 (class 2606 OID 73912)
-- Name: pemakaian_logistik pemakaian_logistik_pemakaian_logistik_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.pemakaian_logistik
    ADD CONSTRAINT pemakaian_logistik_pemakaian_logistik_id_fkey FOREIGN KEY (pemakaian_logistik_id) REFERENCES public.logistik(logistik_id);


--
-- TOC entry 4835 (class 2606 OID 73917)
-- Name: pemakaian_logistik pemakaian_logistik_pemakaian_relawan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.pemakaian_logistik
    ADD CONSTRAINT pemakaian_logistik_pemakaian_relawan_id_fkey FOREIGN KEY (pemakaian_relawan_id) REFERENCES public.relawan(relawan_id);


--
-- TOC entry 4836 (class 2606 OID 114733)
-- Name: quick_count quick_count_quick_count_relawan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.quick_count
    ADD CONSTRAINT quick_count_quick_count_relawan_id_fkey FOREIGN KEY (quick_count_relawan_id) REFERENCES public.relawan(relawan_id);


--
-- TOC entry 4829 (class 2606 OID 73822)
-- Name: relawan relawan_relawan_kandidat_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.relawan
    ADD CONSTRAINT relawan_relawan_kandidat_id_fkey FOREIGN KEY (relawan_kandidat_id) REFERENCES public.kandidat(kandidat_id);


--
-- TOC entry 4830 (class 2606 OID 81963)
-- Name: relawan relawan_relawan_role_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.relawan
    ADD CONSTRAINT relawan_relawan_role_fkey FOREIGN KEY (relawan_role_id) REFERENCES public.roles(role_id);


--
-- TOC entry 4820 (class 2606 OID 65670)
-- Name: users users_user_partai_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_user_partai_fkey FOREIGN KEY (user_partai_id) REFERENCES public.partai(partai_id);


--
-- TOC entry 4821 (class 2606 OID 65675)
-- Name: users users_user_role_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zdn
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_user_role_fkey FOREIGN KEY (user_role_id) REFERENCES public.roles(role_id);


-- Completed on 2024-07-03 06:39:48

--
-- PostgreSQL database dump complete
--

-- Completed on 2024-07-03 06:39:48

--
-- PostgreSQL database cluster dump complete
--

