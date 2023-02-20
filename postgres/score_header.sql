CREATE TABLE public.score_header (
    id integer NOT NULL,
    lecturer_fname text,
    lecturer_lname text,
    lecturer_account text,
    pid text,
    sub_code text,
    sub_name text,
    sub_sect text,
    cmuitaccount text,
    student_id text,
    firstname_th text,
    lastname_th text,
    organization_name_th text,
    score1 text,
    score2 text,
    score3 text,
    score4 text,
    score5 text,
    score6 text,
    dt timestamp without time zone
);


ALTER TABLE public.score_header OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 323328)
-- Name: score_header_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.score_header_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.score_header_id_seq OWNER TO postgres;

--
-- TOC entry 2994 (class 0 OID 0)
-- Dependencies: 202
-- Name: score_header_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.score_header_id_seq OWNED BY public.score_header.id;


--
-- TOC entry 2856 (class 2604 OID 323333)
-- Name: score_header id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.score_header ALTER COLUMN id SET DEFAULT nextval('public.score_header_id_seq'::regclass);


--
-- TOC entry 2988 (class 0 OID 323330)
-- Dependencies: 203
-- Data for Name: score_header; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.score_header (id, lecturer_fname, lecturer_lname, lecturer_account, pid, sub_code, sub_name, sub_sect, cmuitaccount, student_id, firstname_th, lastname_th, organization_name_th, score1, score2, score3, score4, score5, score6, dt) FROM stdin;
2	ศักดิ์ดา	หอมหวล	sakda.homhuan@cmu.ac.th	a1675419248219	154104	การอนุรักษ์สิ่งแวดล้อม	01	\N	รหัสนักศึกษา	ชื่อ - นามสกุล	null	\N	คำถามท้ายบท 1	กิจกรรมท้ายบท 2 miro	คำถามท้ายบท 3	คำถามท้ายบท 4	สอบกลางภาค	รวม	2023-02-03 17:14:08.364863
23	ชนิดา	สุวรรณประสิทธิ์	chanida.suwanprasit@cmu.ac.th	a1676611842524	154431	GEOSPATIAL ANALYSIS & APP	02	\N	รหัสนักศึกษา	ชื่อ - นามสกุล	null	\N	สอบกลางภาค (100)	คะแนน 20%	null	null	null	null	2023-02-17 12:30:42.616388
24	ศักดิ์ดา	หอมหวล	sakda.homhuan@cmu.ac.th	a1676611890770	154431	เทคนิคและการประยุกต์ใช้ระบบสารสนเทศภูมิศาสตร์	01	\N	รหัสนักศึกษา	ชื่อ - นามสกุล	null	\N	กลางภาค (ดิบ)	กลางภาค (20%)	Lab (20%)	คะแนนเก็บ (40%)	null	null	2023-02-17 12:31:30.940612
26	ชนิดา	สุวรรณประสิทธิ์	chanida.suwanprasit@cmu.ac.th	a1676612979422	154330	INTRO TO GIS	01	\N	รหัสนักศึกษา	ชื่อ - นามสกุล	null	\N	กลางภาค (100 คะแนน)	คิดเป็นร้อยละ 30	null	null	null	null	2023-02-17 12:49:39.532909
\.


--
-- TOC entry 2995 (class 0 OID 0)
-- Dependencies: 202
-- Name: score_header_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.score_header_id_seq', 26, true);


-- Completed on 2023-02-17 16:09:31

--
-- PostgreSQL database dump complete
--

