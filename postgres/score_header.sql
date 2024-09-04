--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 16.4

-- Started on 2024-09-04 19:50:06 +07

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 203 (class 1259 OID 323330)
-- Name: score_header; Type: TABLE; Schema: public; Owner: postgres
--

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


ALTER SEQUENCE public.score_header_id_seq OWNER TO postgres;

--
-- TOC entry 3000 (class 0 OID 0)
-- Dependencies: 202
-- Name: score_header_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.score_header_id_seq OWNED BY public.score_header.id;


--
-- TOC entry 2862 (class 2604 OID 323333)
-- Name: score_header id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.score_header ALTER COLUMN id SET DEFAULT nextval('public.score_header_id_seq'::regclass);


--
-- TOC entry 2994 (class 0 OID 323330)
-- Dependencies: 203
-- Data for Name: score_header; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.score_header (id, lecturer_fname, lecturer_lname, lecturer_account, pid, sub_code, sub_name, sub_sect, cmuitaccount, student_id, firstname_th, lastname_th, organization_name_th, score1, score2, score3, score4, score5, score6, dt) VALUES (134, 'ชนิดา', 'สุวรรณประสิทธิ์', 'chanida.suwanprasit@cmu.ac.th', 'a1699238036257', '154499', 'INDEPENDENT STUDY IN GEOGRAPHY', '01', NULL, 'รหัสนักศึกษา', 'ชื่อ - นามสกุล', 'null', NULL, 'Advisor 40', 'Committee 35', 'Convenor 25', 'Total', 'Grade', 'Score6', '2023-11-06 09:33:56.336637') ON CONFLICT DO NOTHING;
INSERT INTO public.score_header (id, lecturer_fname, lecturer_lname, lecturer_account, pid, sub_code, sub_name, sub_sect, cmuitaccount, student_id, firstname_th, lastname_th, organization_name_th, score1, score2, score3, score4, score5, score6, dt) VALUES (145, 'คณิน', 'หุตานุวัตร', 'khanin.h@cmu.ac.th', 'a1706173454656', '154104', 'Environmental Conservation', '701', NULL, 'รหัสนักศึกษา', 'ชื่อ - นามสกุล', 'null', NULL, 'Quiz1(5%)', 'Quiz2(5%)', 'Mid-term(35%)', '4', '5', '6', '2024-01-25 16:04:14.812486') ON CONFLICT DO NOTHING;
INSERT INTO public.score_header (id, lecturer_fname, lecturer_lname, lecturer_account, pid, sub_code, sub_name, sub_sect, cmuitaccount, student_id, firstname_th, lastname_th, organization_name_th, score1, score2, score3, score4, score5, score6, dt) VALUES (147, 'ทวี', 'ชัยพิมลผลิน', 'tawee.c@cmu.ac.th', 'a1706423069398', '154153', 'ภัยพิบัติในโลกสมัยใหม่', '01', NULL, 'รหัสนักศึกษา', 'ชื่อ - นามสกุล', 'null', NULL, 'ข่าว 10%', 'กลางภาค 30%', 'null', 'null', 'null', 'null', '2024-01-28 13:24:29.486062') ON CONFLICT DO NOTHING;
INSERT INTO public.score_header (id, lecturer_fname, lecturer_lname, lecturer_account, pid, sub_code, sub_name, sub_sect, cmuitaccount, student_id, firstname_th, lastname_th, organization_name_th, score1, score2, score3, score4, score5, score6, dt) VALUES (87, 'ทวี', 'ชัยพิมลผลิน', 'tawee.c@cmu.ac.th', 'a1696580810961', '154351', 'ภัยพิบัติธรรมชาติเบื้องต้น', '01', NULL, 'รหัสนักศึกษา', 'ชื่อ - นามสกุล', 'null', NULL, 'รวม 70', 'null', 'null', 'null', 'null', 'null', '2023-10-06 15:26:51.062724') ON CONFLICT DO NOTHING;
INSERT INTO public.score_header (id, lecturer_fname, lecturer_lname, lecturer_account, pid, sub_code, sub_name, sub_sect, cmuitaccount, student_id, firstname_th, lastname_th, organization_name_th, score1, score2, score3, score4, score5, score6, dt) VALUES (89, 'ทวี', 'ชัยพิมลผลิน', 'tawee.c@cmu.ac.th', 'a1696715219973', '154455', 'อุทกวิทยาและทรัพยากรน้ำ', '01', NULL, 'รหัสนักศึกษา', 'ชื่อ - นามสกุล', 'null', NULL, 'งานแบบฝึกหัด 10', 'Project 50', 'บทความ 10', 'ย่อย 1 15', 'รวม 85', 'undefined', '2023-10-08 04:47:00.048989') ON CONFLICT DO NOTHING;
INSERT INTO public.score_header (id, lecturer_fname, lecturer_lname, lecturer_account, pid, sub_code, sub_name, sub_sect, cmuitaccount, student_id, firstname_th, lastname_th, organization_name_th, score1, score2, score3, score4, score5, score6, dt) VALUES (91, 'คณิน', 'หุตานุวัตร', 'khanin.h@cmu.ac.th', 'a1696824801002', '154496', 'Environmental Policy & Analysis', '01', NULL, 'รหัสนักศึกษา', 'ชื่อ - นามสกุล', 'null', NULL, 'กลางภาค(25%)', 'การค้นคว้า(20%)', 'null', 'null', 'null', 'null', '2023-10-09 11:13:21.083535') ON CONFLICT DO NOTHING;
INSERT INTO public.score_header (id, lecturer_fname, lecturer_lname, lecturer_account, pid, sub_code, sub_name, sub_sect, cmuitaccount, student_id, firstname_th, lastname_th, organization_name_th, score1, score2, score3, score4, score5, score6, dt) VALUES (151, 'วาทินี', 'ถาวรธรรม', 'watinee.thavorntam@cmu.ac.th', 'a1706875956885', '154104', 'ENVIRONT CONSERVATION', '01', NULL, 'รหัสนักศึกษา', 'ชื่อ - นามสกุล', 'null', NULL, 'part1(15)', 'part2(10)', 'part3(10)', 'total(35)', 'null', 'null', '2024-02-02 19:12:36.967206') ON CONFLICT DO NOTHING;
INSERT INTO public.score_header (id, lecturer_fname, lecturer_lname, lecturer_account, pid, sub_code, sub_name, sub_sect, cmuitaccount, student_id, firstname_th, lastname_th, organization_name_th, score1, score2, score3, score4, score5, score6, dt) VALUES (153, 'วาทินี', 'ถาวรธรรม', 'watinee.thavorntam@cmu.ac.th', 'a1707137545702', '154330', 'INTRO TO GIS', '03', NULL, 'รหัสนักศึกษา', 'ชื่อ - นามสกุล', 'null', NULL, 'midterm(30)', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', '2024-02-05 19:52:25.787212') ON CONFLICT DO NOTHING;
INSERT INTO public.score_header (id, lecturer_fname, lecturer_lname, lecturer_account, pid, sub_code, sub_name, sub_sect, cmuitaccount, student_id, firstname_th, lastname_th, organization_name_th, score1, score2, score3, score4, score5, score6, dt) VALUES (167, 'ศักดิ์ดา', 'หอมหวล', 'sakda.homhuan@cmu.ac.th', 'a1710118020362', '154431', 'เทคนิคและการประยุกต์ใช้ระบบสารสนเทศภูมิศาสตร์', '01', NULL, 'รหัสนักศึกษา', 'ชื่อ - นามสกุล', 'null', NULL, 'Mid 30 (คะแนนดิบ)', 'mid 20%', 'lab 10%', 'term paper 10%', 'term project friend 10%', 'term project lecturer 20%', '2024-03-11 07:47:00.459556') ON CONFLICT DO NOTHING;
INSERT INTO public.score_header (id, lecturer_fname, lecturer_lname, lecturer_account, pid, sub_code, sub_name, sub_sect, cmuitaccount, student_id, firstname_th, lastname_th, organization_name_th, score1, score2, score3, score4, score5, score6, dt) VALUES (173, 'เผ่าไทย', 'สินอำพล', 'phaothai.s@cmu.ac.th', 'a1719397680864', '154499', 'Independent Study in Geography', '01', NULL, 'รหัสนักศึกษา', 'ชื่อ - นามสกุล', 'null', NULL, 'Proposal (5)', 'null', 'null', 'null', 'null', 'null', '2024-06-26 17:28:00.915378') ON CONFLICT DO NOTHING;
INSERT INTO public.score_header (id, lecturer_fname, lecturer_lname, lecturer_account, pid, sub_code, sub_name, sub_sect, cmuitaccount, student_id, firstname_th, lastname_th, organization_name_th, score1, score2, score3, score4, score5, score6, dt) VALUES (81, 'คณิน', 'หุตานุวัตร', 'khanin.h@cmu.ac.th', 'a1694350354930', '145486', 'Sustainable Environmental Management', '01', NULL, 'รหัสนักศึกษา', 'ชื่อ - นามสกุล', 'null', NULL, 'วิเคราะห์สถานการณ์สวล.(10%)', 'สอบกลางภาค(25%)', 'null', 'null', 'null', 'null', '2023-09-10 19:52:35.008114') ON CONFLICT DO NOTHING;
INSERT INTO public.score_header (id, lecturer_fname, lecturer_lname, lecturer_account, pid, sub_code, sub_name, sub_sect, cmuitaccount, student_id, firstname_th, lastname_th, organization_name_th, score1, score2, score3, score4, score5, score6, dt) VALUES (144, 'คณิน', 'หุตานุวัตร', 'khanin.h@cmu.ac.th', 'a1706172376739', '154104', 'Environmental Conservation', '04', NULL, 'รหัสนักศึกษา', 'ชื่อ - นามสกุล', 'null', NULL, 'Quiz1(5%_', 'Quiz2(5%)', 'Mid-term(35%)', '4', '5', '6', '2024-01-25 15:46:16.814972') ON CONFLICT DO NOTHING;
INSERT INTO public.score_header (id, lecturer_fname, lecturer_lname, lecturer_account, pid, sub_code, sub_name, sub_sect, cmuitaccount, student_id, firstname_th, lastname_th, organization_name_th, score1, score2, score3, score4, score5, score6, dt) VALUES (90, 'ทวี', 'ชัยพิมลผลิน', 'tawee.c@cmu.ac.th', 'a1696715426655', '154455', 'อุทกวิทยาและทรัพยากรน้ำ', '01', NULL, 'รหัสนักศึกษา', 'ชื่อ - นามสกุล', 'null', NULL, 'งานแบบฝึกหัด 10', 'Project 50', 'บทความ 10', 'ย่อย 1 15', 'รวม 85', 'null', '2023-10-08 04:50:26.728539') ON CONFLICT DO NOTHING;
INSERT INTO public.score_header (id, lecturer_fname, lecturer_lname, lecturer_account, pid, sub_code, sub_name, sub_sect, cmuitaccount, student_id, firstname_th, lastname_th, organization_name_th, score1, score2, score3, score4, score5, score6, dt) VALUES (98, 'ทวี', 'ชัยพิมลผลิน', 'tawee.c@cmu.ac.th', 'a1698311629069', '154151', 'ภูมิศาสตร์กายภาพ', '01', NULL, 'รหัสนักศึกษา', 'ชื่อ - นามสกุล', 'null', NULL, 'kahoot 10', 'midterm 30', 'what if 40', 'พิเศษ 4', 'ประเมินวิชา 2', 'รวม', '2023-10-26 16:13:49.148484') ON CONFLICT DO NOTHING;
INSERT INTO public.score_header (id, lecturer_fname, lecturer_lname, lecturer_account, pid, sub_code, sub_name, sub_sect, cmuitaccount, student_id, firstname_th, lastname_th, organization_name_th, score1, score2, score3, score4, score5, score6, dt) VALUES (150, 'วาทินี', 'ถาวรธรรม', 'watinee.thavorntam@cmu.ac.th', 'a1706875693564', '154104', 'ENVIRONT CONSERVATION', '01', NULL, 'รหัสนักศึกษา', 'ชื่อ - นามสกุล', 'null', NULL, 'part1(15)', 'part2(10)', 'part3(10)', 'total(35)', 'null', 'null', '2024-02-02 19:08:13.66506') ON CONFLICT DO NOTHING;
INSERT INTO public.score_header (id, lecturer_fname, lecturer_lname, lecturer_account, pid, sub_code, sub_name, sub_sect, cmuitaccount, student_id, firstname_th, lastname_th, organization_name_th, score1, score2, score3, score4, score5, score6, dt) VALUES (152, 'ชยา', 'วรรธนะภูติ', 'chaya.v@cmu.ac.th', 'a1706962994763', '154141', 'human geography', '01', NULL, 'รหัสนักศึกษา', 'ชื่อ - นามสกุล', 'null', NULL, '1', '2', '3', '4', '5', '6', '2024-02-03 19:23:14.853279') ON CONFLICT DO NOTHING;
INSERT INTO public.score_header (id, lecturer_fname, lecturer_lname, lecturer_account, pid, sub_code, sub_name, sub_sect, cmuitaccount, student_id, firstname_th, lastname_th, organization_name_th, score1, score2, score3, score4, score5, score6, dt) VALUES (154, 'วาทินี', 'ถาวรธรรม', 'watinee.thavorntam@cmu.ac.th', 'a1707226590498', '154434', 'GIS DATABASE MANAGEMENT SYSTEM', '01', NULL, 'รหัสนักศึกษา', 'ชื่อ - นามสกุล', 'null', NULL, 'midterm(30)', 'null', 'null', 'null', 'null', 'null', '2024-02-06 20:36:30.578253') ON CONFLICT DO NOTHING;
INSERT INTO public.score_header (id, lecturer_fname, lecturer_lname, lecturer_account, pid, sub_code, sub_name, sub_sect, cmuitaccount, student_id, firstname_th, lastname_th, organization_name_th, score1, score2, score3, score4, score5, score6, dt) VALUES (156, 'ชยา', 'วรรธนะภูติ', 'chaya.v@cmu.ac.th', 'a1707760186178', '154181', 'environmental geography', '01', NULL, 'รหัสนักศึกษา', 'ชื่อ - นามสกุล', 'null', NULL, '1', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', '2024-02-13 00:49:46.266121') ON CONFLICT DO NOTHING;
INSERT INTO public.score_header (id, lecturer_fname, lecturer_lname, lecturer_account, pid, sub_code, sub_name, sub_sect, cmuitaccount, student_id, firstname_th, lastname_th, organization_name_th, score1, score2, score3, score4, score5, score6, dt) VALUES (160, 'ทวี', 'ชัยพิมลผลิน', 'tawee.c@cmu.ac.th', 'a1709298062030', '154152', 'ดินและน้ำทางภูมิศาสตร์', '01', NULL, 'รหัสนักศึกษา', 'ชื่อ - นามสกุล', 'null', NULL, 'Kahoot 10%', 'บทความ 5%', 'กลางภาค 30%', 'ดินบ้านฉัน 25%', 'ดินบ้านใคร 15%', 'รวม 85%', '2024-03-01 20:01:02.127258') ON CONFLICT DO NOTHING;
INSERT INTO public.score_header (id, lecturer_fname, lecturer_lname, lecturer_account, pid, sub_code, sub_name, sub_sect, cmuitaccount, student_id, firstname_th, lastname_th, organization_name_th, score1, score2, score3, score4, score5, score6, dt) VALUES (168, 'ชนิดา', 'สุวรรณประสิทธิ์', 'chanida.suwanprasit@cmu.ac.th', 'a1710310988288', '154330', 'INTRO TO GIS', '01', NULL, 'รหัสนักศึกษา', 'ชื่อ - นามสกุล', 'null', NULL, 'Midterm 25%', 'Term Project 20%', 'Lab 20%', 'Quiz 5%', 'Attend 5%', 'รวม 75%', '2024-03-13 13:23:08.464968') ON CONFLICT DO NOTHING;
INSERT INTO public.score_header (id, lecturer_fname, lecturer_lname, lecturer_account, pid, sub_code, sub_name, sub_sect, cmuitaccount, student_id, firstname_th, lastname_th, organization_name_th, score1, score2, score3, score4, score5, score6, dt) VALUES (170, 'ศักดิ์ดา', 'หอมหวล', 'sakda.homhuan@cmu.ac.th', 'a1710315230222', '154330', 'Introduction to Geographic Information System', '02', NULL, 'รหัสนักศึกษา', 'ชื่อ - นามสกุล', 'null', NULL, 'mid term (30%)', 'lab (8%)', 'paper (2%)', 'termproj friend (10%)', 'termproj lecturer (20%)', 'final 30%', '2024-03-13 14:33:50.404953') ON CONFLICT DO NOTHING;
INSERT INTO public.score_header (id, lecturer_fname, lecturer_lname, lecturer_account, pid, sub_code, sub_name, sub_sect, cmuitaccount, student_id, firstname_th, lastname_th, organization_name_th, score1, score2, score3, score4, score5, score6, dt) VALUES (172, 'ชนิดา', 'สุวรรณประสิทธิ์', 'chanida.suwanprasit@cmu.ac.th', 'a1710501805670', '154431', 'GEOSPATIAL ANALYSIS & APP', '02', NULL, 'รหัสนักศึกษา', 'ชื่อ - นามสกุล', 'null', NULL, 'Midterm 20%', 'Term pro 40%', 'Paper5%', 'Lab5%', 'Final 30%', 'รวม 70%', '2024-03-15 18:23:25.75858') ON CONFLICT DO NOTHING;
INSERT INTO public.score_header (id, lecturer_fname, lecturer_lname, lecturer_account, pid, sub_code, sub_name, sub_sect, cmuitaccount, student_id, firstname_th, lastname_th, organization_name_th, score1, score2, score3, score4, score5, score6, dt) VALUES (68, 'ทวี', 'ชัยพิมลผลิน', 'tawee.c@cmu.ac.th', 'a1692098948112', '154351', 'ภัยพิบัติธรรมชาติเบื้องต้น', '01', NULL, 'รหัสนักศึกษา', 'ชื่อ - นามสกุล', 'null', NULL, 'ย่อย 1_20', 'บทความ 5', 'ย่อย2_15', 'รวม', 'null', 'null', '2023-08-15 18:29:08.201587') ON CONFLICT DO NOTHING;


--
-- TOC entry 3001 (class 0 OID 0)
-- Dependencies: 202
-- Name: score_header_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.score_header_id_seq', 173, true);


-- Completed on 2024-09-04 19:50:19 +07

--
-- PostgreSQL database dump complete
--

