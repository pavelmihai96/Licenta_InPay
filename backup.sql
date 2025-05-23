PGDMP      ,    	            }           sms_database    17.0    17.0 D    N           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            O           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            P           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            Q           1262    25601    sms_database    DATABASE     �   CREATE DATABASE sms_database WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Romanian_Romania.1252';
    DROP DATABASE sms_database;
                     postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                     pg_database_owner    false            R           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                        pg_database_owner    false    4            _           1247    25613 	   role_enum    TYPE     G   CREATE TYPE public.role_enum AS ENUM (
    'student',
    'teacher'
);
    DROP TYPE public.role_enum;
       public               postgres    false    4            �            1259    25705    assignments    TABLE       CREATE TABLE public.assignments (
    assignment_id integer NOT NULL,
    course_id integer NOT NULL,
    assignment_name character varying NOT NULL,
    max_score integer NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);
    DROP TABLE public.assignments;
       public         heap r       postgres    false    4            �            1259    25704    assignments_assignment_id_seq    SEQUENCE     �   ALTER TABLE public.assignments ALTER COLUMN assignment_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.assignments_assignment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public               postgres    false    4    230            �            1259    25676    courses    TABLE     �   CREATE TABLE public.courses (
    course_id integer NOT NULL,
    course_name character varying NOT NULL,
    teacher_id integer NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);
    DROP TABLE public.courses;
       public         heap r       postgres    false    4            �            1259    25675    courses_course_id_seq    SEQUENCE     �   ALTER TABLE public.courses ALTER COLUMN course_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.courses_course_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public               postgres    false    226    4            �            1259    25689    enrollments    TABLE     �   CREATE TABLE public.enrollments (
    enrollment_id integer NOT NULL,
    student_id integer NOT NULL,
    course_id integer NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);
    DROP TABLE public.enrollments;
       public         heap r       postgres    false    4            �            1259    25688    enrollments_enrollment_id_seq    SEQUENCE     �   ALTER TABLE public.enrollments ALTER COLUMN enrollment_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.enrollments_enrollment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public               postgres    false    4    228            �            1259    25736    grade_history    TABLE     �   CREATE TABLE public.grade_history (
    history_id integer NOT NULL,
    grade_id integer NOT NULL,
    old_score numeric NOT NULL,
    new_score numeric NOT NULL,
    changed_by integer NOT NULL,
    changed_at timestamp without time zone
);
 !   DROP TABLE public.grade_history;
       public         heap r       postgres    false    4            �            1259    25735    grade_history_history_id_seq    SEQUENCE     �   ALTER TABLE public.grade_history ALTER COLUMN history_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.grade_history_history_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public               postgres    false    234    4            �            1259    25718    grades    TABLE     �   CREATE TABLE public.grades (
    grade_id integer NOT NULL,
    student_id integer NOT NULL,
    assignment_id integer NOT NULL,
    score numeric NOT NULL,
    graded_at timestamp without time zone,
    updated_at timestamp without time zone
);
    DROP TABLE public.grades;
       public         heap r       postgres    false    4            �            1259    25717    grades_grade_id_seq    SEQUENCE     �   ALTER TABLE public.grades ALTER COLUMN grade_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.grades_grade_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public               postgres    false    4    232            �            1259    25661    password_resets    TABLE     �   CREATE TABLE public.password_resets (
    reset_id integer NOT NULL,
    user_id integer NOT NULL,
    reset_token character varying NOT NULL,
    expires_at timestamp without time zone NOT NULL,
    created_at timestamp without time zone
);
 #   DROP TABLE public.password_resets;
       public         heap r       postgres    false    4            �            1259    25660    password_resets_reset_id_seq    SEQUENCE     �   ALTER TABLE public.password_resets ALTER COLUMN reset_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.password_resets_reset_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public               postgres    false    4    224            �            1259    25646    students    TABLE     $  CREATE TABLE public.students (
    student_id integer NOT NULL,
    user_id integer NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    dob date NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);
    DROP TABLE public.students;
       public         heap r       postgres    false    4            �            1259    25645    students_student_id_seq    SEQUENCE     �   ALTER TABLE public.students ALTER COLUMN student_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.students_student_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public               postgres    false    4    222            �            1259    25631    teachers    TABLE       CREATE TABLE public.teachers (
    teacher_id integer NOT NULL,
    user_id integer NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);
    DROP TABLE public.teachers;
       public         heap r       postgres    false    4            �            1259    25630    teachers_teacher_id_seq    SEQUENCE     �   ALTER TABLE public.teachers ALTER COLUMN teacher_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.teachers_teacher_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public               postgres    false    4    220            �            1259    25619    users    TABLE     5  CREATE TABLE public.users (
    user_id integer NOT NULL,
    email character varying NOT NULL,
    username character varying NOT NULL,
    password_hash character varying NOT NULL,
    role public.role_enum NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);
    DROP TABLE public.users;
       public         heap r       postgres    false    863    4            �            1259    25618    users_user_id_seq    SEQUENCE     �   ALTER TABLE public.users ALTER COLUMN user_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public               postgres    false    218    4            G          0    25705    assignments 
   TABLE DATA           s   COPY public.assignments (assignment_id, course_id, assignment_name, max_score, created_at, updated_at) FROM stdin;
    public               postgres    false    230   rW       C          0    25676    courses 
   TABLE DATA           ]   COPY public.courses (course_id, course_name, teacher_id, created_at, updated_at) FROM stdin;
    public               postgres    false    226   �W       E          0    25689    enrollments 
   TABLE DATA           c   COPY public.enrollments (enrollment_id, student_id, course_id, created_at, updated_at) FROM stdin;
    public               postgres    false    228   �W       K          0    25736    grade_history 
   TABLE DATA           k   COPY public.grade_history (history_id, grade_id, old_score, new_score, changed_by, changed_at) FROM stdin;
    public               postgres    false    234   �W       I          0    25718    grades 
   TABLE DATA           c   COPY public.grades (grade_id, student_id, assignment_id, score, graded_at, updated_at) FROM stdin;
    public               postgres    false    232   �W       A          0    25661    password_resets 
   TABLE DATA           a   COPY public.password_resets (reset_id, user_id, reset_token, expires_at, created_at) FROM stdin;
    public               postgres    false    224   X       ?          0    25646    students 
   TABLE DATA           k   COPY public.students (student_id, user_id, first_name, last_name, dob, created_at, updated_at) FROM stdin;
    public               postgres    false    222    X       =          0    25631    teachers 
   TABLE DATA           f   COPY public.teachers (teacher_id, user_id, first_name, last_name, created_at, updated_at) FROM stdin;
    public               postgres    false    220   =X       ;          0    25619    users 
   TABLE DATA           f   COPY public.users (user_id, email, username, password_hash, role, created_at, updated_at) FROM stdin;
    public               postgres    false    218   ZX       S           0    0    assignments_assignment_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.assignments_assignment_id_seq', 1, false);
          public               postgres    false    229            T           0    0    courses_course_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.courses_course_id_seq', 1, false);
          public               postgres    false    225            U           0    0    enrollments_enrollment_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.enrollments_enrollment_id_seq', 1, false);
          public               postgres    false    227            V           0    0    grade_history_history_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.grade_history_history_id_seq', 1, false);
          public               postgres    false    233            W           0    0    grades_grade_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.grades_grade_id_seq', 1, false);
          public               postgres    false    231            X           0    0    password_resets_reset_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.password_resets_reset_id_seq', 1, false);
          public               postgres    false    223            Y           0    0    students_student_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.students_student_id_seq', 1, false);
          public               postgres    false    221            Z           0    0    teachers_teacher_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.teachers_teacher_id_seq', 1, false);
          public               postgres    false    219            [           0    0    users_user_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.users_user_id_seq', 2, true);
          public               postgres    false    217            �           2606    25711    assignments assignments_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.assignments
    ADD CONSTRAINT assignments_pkey PRIMARY KEY (assignment_id);
 F   ALTER TABLE ONLY public.assignments DROP CONSTRAINT assignments_pkey;
       public                 postgres    false    230            �           2606    25682    courses courses_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (course_id);
 >   ALTER TABLE ONLY public.courses DROP CONSTRAINT courses_pkey;
       public                 postgres    false    226            �           2606    25693    enrollments enrollments_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_pkey PRIMARY KEY (enrollment_id);
 F   ALTER TABLE ONLY public.enrollments DROP CONSTRAINT enrollments_pkey;
       public                 postgres    false    228            �           2606    25742     grade_history grade_history_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.grade_history
    ADD CONSTRAINT grade_history_pkey PRIMARY KEY (history_id);
 J   ALTER TABLE ONLY public.grade_history DROP CONSTRAINT grade_history_pkey;
       public                 postgres    false    234            �           2606    25724    grades grades_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.grades
    ADD CONSTRAINT grades_pkey PRIMARY KEY (grade_id);
 <   ALTER TABLE ONLY public.grades DROP CONSTRAINT grades_pkey;
       public                 postgres    false    232            �           2606    25667 $   password_resets password_resets_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.password_resets
    ADD CONSTRAINT password_resets_pkey PRIMARY KEY (reset_id);
 N   ALTER TABLE ONLY public.password_resets DROP CONSTRAINT password_resets_pkey;
       public                 postgres    false    224            �           2606    25669 /   password_resets password_resets_reset_token_key 
   CONSTRAINT     q   ALTER TABLE ONLY public.password_resets
    ADD CONSTRAINT password_resets_reset_token_key UNIQUE (reset_token);
 Y   ALTER TABLE ONLY public.password_resets DROP CONSTRAINT password_resets_reset_token_key;
       public                 postgres    false    224            �           2606    25652    students students_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (student_id);
 @   ALTER TABLE ONLY public.students DROP CONSTRAINT students_pkey;
       public                 postgres    false    222            �           2606    25654    students students_user_id_key 
   CONSTRAINT     [   ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_user_id_key UNIQUE (user_id);
 G   ALTER TABLE ONLY public.students DROP CONSTRAINT students_user_id_key;
       public                 postgres    false    222            �           2606    25637    teachers teachers_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.teachers
    ADD CONSTRAINT teachers_pkey PRIMARY KEY (teacher_id);
 @   ALTER TABLE ONLY public.teachers DROP CONSTRAINT teachers_pkey;
       public                 postgres    false    220            �           2606    25639    teachers teachers_user_id_key 
   CONSTRAINT     [   ALTER TABLE ONLY public.teachers
    ADD CONSTRAINT teachers_user_id_key UNIQUE (user_id);
 G   ALTER TABLE ONLY public.teachers DROP CONSTRAINT teachers_user_id_key;
       public                 postgres    false    220            �           2606    25627    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public                 postgres    false    218            �           2606    25625    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public                 postgres    false    218            �           2606    25629    users users_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key;
       public                 postgres    false    218            �           2606    25712 &   assignments assignments_course_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.assignments
    ADD CONSTRAINT assignments_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(course_id);
 P   ALTER TABLE ONLY public.assignments DROP CONSTRAINT assignments_course_id_fkey;
       public               postgres    false    230    4757    226            �           2606    25683    courses courses_teacher_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES public.teachers(teacher_id);
 I   ALTER TABLE ONLY public.courses DROP CONSTRAINT courses_teacher_id_fkey;
       public               postgres    false    4745    220    226            �           2606    25699 &   enrollments enrollments_course_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(course_id);
 P   ALTER TABLE ONLY public.enrollments DROP CONSTRAINT enrollments_course_id_fkey;
       public               postgres    false    226    4757    228            �           2606    25694 '   enrollments enrollments_student_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(student_id);
 Q   ALTER TABLE ONLY public.enrollments DROP CONSTRAINT enrollments_student_id_fkey;
       public               postgres    false    4749    222    228            �           2606    25748 +   grade_history grade_history_changed_by_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.grade_history
    ADD CONSTRAINT grade_history_changed_by_fkey FOREIGN KEY (changed_by) REFERENCES public.users(user_id);
 U   ALTER TABLE ONLY public.grade_history DROP CONSTRAINT grade_history_changed_by_fkey;
       public               postgres    false    218    234    4741            �           2606    25743 )   grade_history grade_history_grade_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.grade_history
    ADD CONSTRAINT grade_history_grade_id_fkey FOREIGN KEY (grade_id) REFERENCES public.grades(grade_id);
 S   ALTER TABLE ONLY public.grade_history DROP CONSTRAINT grade_history_grade_id_fkey;
       public               postgres    false    232    4763    234            �           2606    25730     grades grades_assignment_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.grades
    ADD CONSTRAINT grades_assignment_id_fkey FOREIGN KEY (assignment_id) REFERENCES public.assignments(assignment_id);
 J   ALTER TABLE ONLY public.grades DROP CONSTRAINT grades_assignment_id_fkey;
       public               postgres    false    230    4761    232            �           2606    25725    grades grades_student_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.grades
    ADD CONSTRAINT grades_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(student_id);
 G   ALTER TABLE ONLY public.grades DROP CONSTRAINT grades_student_id_fkey;
       public               postgres    false    232    4749    222            �           2606    25670 ,   password_resets password_resets_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.password_resets
    ADD CONSTRAINT password_resets_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);
 V   ALTER TABLE ONLY public.password_resets DROP CONSTRAINT password_resets_user_id_fkey;
       public               postgres    false    4741    218    224            �           2606    25655    students students_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);
 H   ALTER TABLE ONLY public.students DROP CONSTRAINT students_user_id_fkey;
       public               postgres    false    222    218    4741            �           2606    25640    teachers teachers_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.teachers
    ADD CONSTRAINT teachers_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);
 H   ALTER TABLE ONLY public.teachers DROP CONSTRAINT teachers_user_id_fkey;
       public               postgres    false    220    218    4741            G      x������ � �      C      x������ � �      E      x������ � �      K      x������ � �      I      x������ � �      A      x������ � �      ?      x������ � �      =      x������ � �      ;   ~   x�}�A
�  ��+����V���BX₄FC4��oȩ4���A�J�:�ɋ��!z,�w�k�8,\볬��d2�:c;����`z�ȣ��Q�`�,���jۢ����!M��nJݵR�X�=�     