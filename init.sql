-- =====================================================
-- INIT.SQL
-- Auto-generated from CSV data
-- Runs automatically on first Docker PostgreSQL startup
-- =====================================================

-- CREATE TABLES

CREATE TABLE IF NOT EXISTS equipment (
  equipment_id VARCHAR PRIMARY KEY,
  equipment_type VARCHAR,
  criticality VARCHAR,
  location VARCHAR,
  install_year INTEGER
);

CREATE TABLE IF NOT EXISTS maintenance_history (
  equipment_id VARCHAR,
  failure_mode VARCHAR,
  failure_date DATE,
  repair_duration_hours FLOAT,
  priority VARCHAR,
  maintenance_type VARCHAR
);

CREATE TABLE IF NOT EXISTS preventive_maintenance (
  pm_id VARCHAR PRIMARY KEY,
  equipment_id VARCHAR,
  task VARCHAR,
  last_maintenance_date DATE,
  interval_days INTEGER,
  next_due_date DATE,
  status VARCHAR
);

CREATE TABLE IF NOT EXISTS spare_parts (
  equipment_id VARCHAR PRIMARY KEY,
  spare_status VARCHAR,
  lead_time_weeks INTEGER
);

CREATE TABLE IF NOT EXISTS crew_availability (
  equipment_id VARCHAR PRIMARY KEY,
  crew_available BOOLEAN,
  days_until_next_rotation INTEGER
);

CREATE TABLE IF NOT EXISTS technician_tools (
  equipment_id VARCHAR PRIMARY KEY,
  technician_available BOOLEAN,
  tools_available BOOLEAN
);

-- INSERT DATA

-- equipment
INSERT INTO equipment VALUES ('E1001','Pump','C','Offshore Deck',2018);
INSERT INTO equipment VALUES ('E1002','Compressor','A','Offshore Deck',2022);
INSERT INTO equipment VALUES ('E1003','Pump','C','Process Area B',2010);
INSERT INTO equipment VALUES ('E1004','Motor','C','Process Area A',2015);
INSERT INTO equipment VALUES ('E1005','Compressor','B','Process Area B',2011);
INSERT INTO equipment VALUES ('E1006','Pump','C','Utility Area',2017);
INSERT INTO equipment VALUES ('E1007','Pump','B','Process Area B',2018);
INSERT INTO equipment VALUES ('E1008','Compressor','A','Utility Area',2022);
INSERT INTO equipment VALUES ('E1009','Motor','B','Offshore Deck',2011);
INSERT INTO equipment VALUES ('E1010','Motor','B','Process Area B',2016);
INSERT INTO equipment VALUES ('E1011','Valve','A','Process Area B',2018);
INSERT INTO equipment VALUES ('E1012','Motor','B','Offshore Deck',2022);
INSERT INTO equipment VALUES ('E1013','Motor','C','Process Area A',2010);
INSERT INTO equipment VALUES ('E1014','Compressor','B','Offshore Deck',2008);
INSERT INTO equipment VALUES ('E1015','Pump','C','Offshore Deck',2007);
INSERT INTO equipment VALUES ('E1016','Pump','A','Utility Area',2018);
INSERT INTO equipment VALUES ('E1017','Compressor','C','Process Area A',2012);
INSERT INTO equipment VALUES ('E1018','Valve','A','Offshore Deck',2021);
INSERT INTO equipment VALUES ('E1019','Valve','B','Process Area B',2006);
INSERT INTO equipment VALUES ('E1020','Motor','B','Utility Area',2016);
INSERT INTO equipment VALUES ('E1021','Motor','C','Process Area A',2017);
INSERT INTO equipment VALUES ('E1022','Valve','C','Process Area A',2008);
INSERT INTO equipment VALUES ('E1023','Motor','B','Offshore Deck',2010);
INSERT INTO equipment VALUES ('E1024','Pump','A','Utility Area',2007);
INSERT INTO equipment VALUES ('E1025','Motor','A','Offshore Deck',2009);
INSERT INTO equipment VALUES ('E1026','Valve','B','Offshore Deck',2012);
INSERT INTO equipment VALUES ('E1027','Compressor','B','Process Area B',2013);
INSERT INTO equipment VALUES ('E1028','Motor','B','Process Area B',2017);
INSERT INTO equipment VALUES ('E1029','Pump','A','Process Area A',2021);
INSERT INTO equipment VALUES ('E1030','Motor','A','Process Area A',2005);
INSERT INTO equipment VALUES ('E1031','Valve','A','Utility Area',2015);
INSERT INTO equipment VALUES ('E1032','Pump','B','Process Area B',2021);
INSERT INTO equipment VALUES ('E1033','Compressor','A','Offshore Deck',2011);
INSERT INTO equipment VALUES ('E1034','Motor','B','Utility Area',2007);
INSERT INTO equipment VALUES ('E1035','Motor','A','Process Area B',2015);
INSERT INTO equipment VALUES ('E1036','Compressor','B','Process Area A',2006);
INSERT INTO equipment VALUES ('E1037','Motor','C','Process Area B',2018);
INSERT INTO equipment VALUES ('E1038','Compressor','A','Process Area B',2012);
INSERT INTO equipment VALUES ('E1039','Compressor','C','Process Area B',2014);
INSERT INTO equipment VALUES ('E1040','Compressor','C','Offshore Deck',2012);
INSERT INTO equipment VALUES ('E1041','Compressor','B','Process Area A',2012);
INSERT INTO equipment VALUES ('E1042','Compressor','B','Process Area B',2005);
INSERT INTO equipment VALUES ('E1043','Valve','A','Utility Area',2012);
INSERT INTO equipment VALUES ('E1044','Compressor','C','Process Area B',2016);
INSERT INTO equipment VALUES ('E1045','Motor','B','Process Area A',2006);
INSERT INTO equipment VALUES ('E1046','Motor','C','Process Area B',2014);
INSERT INTO equipment VALUES ('E1047','Pump','A','Process Area B',2014);
INSERT INTO equipment VALUES ('E1048','Pump','A','Process Area A',2015);
INSERT INTO equipment VALUES ('E1049','Pump','B','Process Area A',2015);
INSERT INTO equipment VALUES ('E1050','Motor','A','Utility Area',2012);

-- maintenance_history
INSERT INTO maintenance_history VALUES ('E1025','Bearing Wear','2023-12-25',6.96,'P1','Corrective');
INSERT INTO maintenance_history VALUES ('E1034','Overheating','2023-09-10',6.63,'P1','Corrective');
INSERT INTO maintenance_history VALUES ('E1022','Bearing Wear','2023-09-26',7.32,'P1','Inspection');
INSERT INTO maintenance_history VALUES ('E1026','Seal Failure','2023-03-27',1.44,'P2','Inspection');
INSERT INTO maintenance_history VALUES ('E1032','Leakage','2024-07-03',5.02,'P1','Inspection');
INSERT INTO maintenance_history VALUES ('E1021','Seal Failure','2023-07-11',3.96,'P3','Corrective');
INSERT INTO maintenance_history VALUES ('E1036','Leakage','2024-07-27',3.83,'P1','Inspection');
INSERT INTO maintenance_history VALUES ('E1042','Leakage','2023-01-29',8.54,'P2','Inspection');
INSERT INTO maintenance_history VALUES ('E1038','Electrical Fault','2023-05-25',5.16,'P3','Inspection');
INSERT INTO maintenance_history VALUES ('E1015','Overheating','2023-08-06',2.53,'P3','Corrective');
INSERT INTO maintenance_history VALUES ('E1014','Electrical Fault','2023-09-07',1.21,'P2','Inspection');
INSERT INTO maintenance_history VALUES ('E1050','Overheating','2023-03-17',4.35,'P3','Inspection');
INSERT INTO maintenance_history VALUES ('E1037','Leakage','2023-11-13',5.66,'P2','Corrective');
INSERT INTO maintenance_history VALUES ('E1002','Bearing Wear','2024-07-08',8.69,'P2','Inspection');
INSERT INTO maintenance_history VALUES ('E1037','Overheating','2024-06-24',4.01,'P3','Corrective');
INSERT INTO maintenance_history VALUES ('E1036','Seal Failure','2024-05-31',8.84,'P3','Corrective');
INSERT INTO maintenance_history VALUES ('E1017','Electrical Fault','2024-04-17',4.19,'P1','Inspection');
INSERT INTO maintenance_history VALUES ('E1039','Seal Failure','2023-03-25',2.94,'P2','Corrective');
INSERT INTO maintenance_history VALUES ('E1002','Electrical Fault','2023-10-03',9.14,'P3','Inspection');
INSERT INTO maintenance_history VALUES ('E1041','Electrical Fault','2024-04-24',6.94,'P1','Corrective');
INSERT INTO maintenance_history VALUES ('E1037','Bearing Wear','2023-08-30',1.11,'P1','Inspection');
INSERT INTO maintenance_history VALUES ('E1050','Seal Failure','2023-02-28',6.56,'P3','Corrective');
INSERT INTO maintenance_history VALUES ('E1013','Bearing Wear','2023-10-01',1.52,'P1','Corrective');
INSERT INTO maintenance_history VALUES ('E1002','Leakage','2023-09-15',3.87,'P1','Inspection');
INSERT INTO maintenance_history VALUES ('E1045','Leakage','2023-06-03',7.31,'P3','Inspection');
INSERT INTO maintenance_history VALUES ('E1038','Seal Failure','2023-03-03',8.29,'P2','Inspection');
INSERT INTO maintenance_history VALUES ('E1036','Seal Failure','2023-12-29',1.56,'P1','Corrective');
INSERT INTO maintenance_history VALUES ('E1020','Leakage','2023-08-16',7.85,'P3','Inspection');
INSERT INTO maintenance_history VALUES ('E1038','Leakage','2023-06-25',1.16,'P2','Corrective');
INSERT INTO maintenance_history VALUES ('E1033','Overheating','2023-01-30',2.33,'P3','Inspection');
INSERT INTO maintenance_history VALUES ('E1008','Overheating','2023-03-12',2.6,'P2','Inspection');
INSERT INTO maintenance_history VALUES ('E1035','Overheating','2023-01-01',4.46,'P1','Inspection');
INSERT INTO maintenance_history VALUES ('E1013','Overheating','2024-03-17',5.71,'P1','Corrective');
INSERT INTO maintenance_history VALUES ('E1008','Seal Failure','2023-04-08',3.44,'P3','Inspection');
INSERT INTO maintenance_history VALUES ('E1031','Overheating','2023-02-08',2.84,'P1','Inspection');
INSERT INTO maintenance_history VALUES ('E1020','Seal Failure','2023-03-05',1.81,'P2','Corrective');
INSERT INTO maintenance_history VALUES ('E1024','Bearing Wear','2023-12-15',6.23,'P3','Corrective');
INSERT INTO maintenance_history VALUES ('E1007','Seal Failure','2023-04-26',7.02,'P1','Corrective');
INSERT INTO maintenance_history VALUES ('E1013','Bearing Wear','2024-05-19',2.69,'P1','Corrective');
INSERT INTO maintenance_history VALUES ('E1001','Bearing Wear','2023-11-22',3.54,'P2','Corrective');
INSERT INTO maintenance_history VALUES ('E1020','Leakage','2024-07-13',2.81,'P3','Inspection');
INSERT INTO maintenance_history VALUES ('E1022','Bearing Wear','2023-07-26',9.42,'P3','Corrective');
INSERT INTO maintenance_history VALUES ('E1014','Electrical Fault','2023-04-08',2.53,'P1','Corrective');
INSERT INTO maintenance_history VALUES ('E1017','Bearing Wear','2023-12-03',5.44,'P3','Corrective');
INSERT INTO maintenance_history VALUES ('E1036','Leakage','2023-01-29',9.71,'P3','Corrective');
INSERT INTO maintenance_history VALUES ('E1016','Overheating','2024-01-06',1.91,'P3','Inspection');
INSERT INTO maintenance_history VALUES ('E1039','Bearing Wear','2023-06-19',6.57,'P2','Inspection');
INSERT INTO maintenance_history VALUES ('E1047','Bearing Wear','2024-02-01',2.47,'P2','Corrective');
INSERT INTO maintenance_history VALUES ('E1010','Leakage','2024-04-06',7.62,'P3','Corrective');
INSERT INTO maintenance_history VALUES ('E1028','Overheating','2023-11-04',2.89,'P2','Corrective');
INSERT INTO maintenance_history VALUES ('E1010','Seal Failure','2023-12-25',5.87,'P3','Inspection');
INSERT INTO maintenance_history VALUES ('E1008','Leakage','2023-04-04',2.4,'P3','Corrective');
INSERT INTO maintenance_history VALUES ('E1040','Electrical Fault','2024-05-22',2.46,'P1','Inspection');
INSERT INTO maintenance_history VALUES ('E1036','Electrical Fault','2023-11-13',3.01,'P1','Corrective');
INSERT INTO maintenance_history VALUES ('E1032','Electrical Fault','2023-02-28',7.95,'P2','Corrective');
INSERT INTO maintenance_history VALUES ('E1034','Overheating','2024-02-03',3.71,'P2','Inspection');
INSERT INTO maintenance_history VALUES ('E1048','Leakage','2024-06-29',3.35,'P3','Corrective');
INSERT INTO maintenance_history VALUES ('E1018','Seal Failure','2023-08-12',7.22,'P2','Inspection');
INSERT INTO maintenance_history VALUES ('E1042','Bearing Wear','2023-11-29',4.47,'P2','Corrective');
INSERT INTO maintenance_history VALUES ('E1030','Seal Failure','2023-01-11',6.34,'P3','Corrective');
INSERT INTO maintenance_history VALUES ('E1021','Seal Failure','2023-02-28',2.14,'P1','Corrective');
INSERT INTO maintenance_history VALUES ('E1009','Overheating','2024-07-05',9.46,'P1','Corrective');
INSERT INTO maintenance_history VALUES ('E1037','Overheating','2023-03-25',5.72,'P3','Inspection');
INSERT INTO maintenance_history VALUES ('E1018','Overheating','2024-04-20',3.06,'P2','Inspection');
INSERT INTO maintenance_history VALUES ('E1033','Leakage','2024-06-03',6.61,'P1','Corrective');
INSERT INTO maintenance_history VALUES ('E1033','Overheating','2023-02-27',2.31,'P1','Inspection');
INSERT INTO maintenance_history VALUES ('E1018','Overheating','2024-06-12',6.39,'P3','Corrective');
INSERT INTO maintenance_history VALUES ('E1011','Leakage','2023-12-09',5.6,'P2','Corrective');
INSERT INTO maintenance_history VALUES ('E1028','Electrical Fault','2024-02-09',4.11,'P2','Corrective');
INSERT INTO maintenance_history VALUES ('E1029','Overheating','2024-04-07',6.81,'P3','Corrective');
INSERT INTO maintenance_history VALUES ('E1029','Seal Failure','2023-07-08',9.29,'P1','Corrective');
INSERT INTO maintenance_history VALUES ('E1009','Electrical Fault','2023-07-27',7.73,'P3','Inspection');
INSERT INTO maintenance_history VALUES ('E1013','Leakage','2024-05-03',6.87,'P3','Inspection');
INSERT INTO maintenance_history VALUES ('E1008','Leakage','2023-04-18',2.17,'P3','Inspection');
INSERT INTO maintenance_history VALUES ('E1035','Bearing Wear','2023-11-05',8.12,'P3','Corrective');
INSERT INTO maintenance_history VALUES ('E1037','Overheating','2023-10-04',2.76,'P1','Corrective');
INSERT INTO maintenance_history VALUES ('E1024','Leakage','2024-06-01',8.83,'P2','Inspection');
INSERT INTO maintenance_history VALUES ('E1015','Leakage','2025-02-25',6.85,'P3','Corrective');
INSERT INTO maintenance_history VALUES ('E1014','Overheating','2023-12-23',6.85,'P3','Corrective');
INSERT INTO maintenance_history VALUES ('E1027','Electrical Fault','2023-08-26',2.61,'P3','Corrective');
INSERT INTO maintenance_history VALUES ('E1033','Leakage','2024-04-26',2.33,'P2','Inspection');
INSERT INTO maintenance_history VALUES ('E1050','Bearing Wear','2024-06-27',5.28,'P1','Corrective');
INSERT INTO maintenance_history VALUES ('E1028','Bearing Wear','2023-12-13',4.47,'P3','Corrective');
INSERT INTO maintenance_history VALUES ('E1035','Overheating','2023-07-30',8.04,'P2','Corrective');
INSERT INTO maintenance_history VALUES ('E1038','Electrical Fault','2024-08-05',6.9,'P3','Corrective');
INSERT INTO maintenance_history VALUES ('E1037','Leakage','2023-06-10',4.52,'P2','Corrective');
INSERT INTO maintenance_history VALUES ('E1048','Bearing Wear','2023-05-02',3.64,'P2','Inspection');
INSERT INTO maintenance_history VALUES ('E1009','Seal Failure','2023-04-10',8.45,'P1','Corrective');
INSERT INTO maintenance_history VALUES ('E1038','Overheating','2024-08-18',1.22,'P3','Inspection');
INSERT INTO maintenance_history VALUES ('E1042','Leakage','2023-09-02',6.54,'P1','Corrective');
INSERT INTO maintenance_history VALUES ('E1016','Overheating','2023-08-04',3.86,'P3','Inspection');
INSERT INTO maintenance_history VALUES ('E1022','Leakage','2023-06-25',2.54,'P2','Inspection');
INSERT INTO maintenance_history VALUES ('E1030','Overheating','2023-11-01',2.86,'P1','Inspection');
INSERT INTO maintenance_history VALUES ('E1032','Seal Failure','2023-07-26',6.63,'P2','Inspection');
INSERT INTO maintenance_history VALUES ('E1012','Leakage','2023-07-14',8.88,'P2','Corrective');
INSERT INTO maintenance_history VALUES ('E1018','Electrical Fault','2024-03-05',6.05,'P1','Corrective');
INSERT INTO maintenance_history VALUES ('E1049','Electrical Fault','2023-01-17',9.14,'P2','Corrective');
INSERT INTO maintenance_history VALUES ('E1037','Bearing Wear','2023-02-10',5.57,'P3','Inspection');
INSERT INTO maintenance_history VALUES ('E1046','Leakage','2023-06-02',2.89,'P3','Inspection');
INSERT INTO maintenance_history VALUES ('E1033','Leakage','2023-04-05',7.33,'P1','Inspection');
INSERT INTO maintenance_history VALUES ('E1021','Bearing Wear','2024-05-03',8.09,'P2','Inspection');
INSERT INTO maintenance_history VALUES ('E1035','Bearing Wear','2024-03-19',8.84,'P2','Corrective');
INSERT INTO maintenance_history VALUES ('E1021','Overheating','2024-03-19',1.05,'P2','Corrective');
INSERT INTO maintenance_history VALUES ('E1049','Overheating','2023-09-26',1.12,'P3','Inspection');
INSERT INTO maintenance_history VALUES ('E1016','Bearing Wear','2023-08-01',4.62,'P1','Inspection');
INSERT INTO maintenance_history VALUES ('E1022','Overheating','2023-05-07',3.88,'P2','Inspection');
INSERT INTO maintenance_history VALUES ('E1014','Bearing Wear','2024-06-21',1.67,'P1','Corrective');
INSERT INTO maintenance_history VALUES ('E1030','Electrical Fault','2023-04-27',6.27,'P1','Inspection');
INSERT INTO maintenance_history VALUES ('E1019','Electrical Fault','2024-03-03',9.24,'P3','Corrective');
INSERT INTO maintenance_history VALUES ('E1007','Overheating','2023-10-13',2.29,'P1','Inspection');
INSERT INTO maintenance_history VALUES ('E1015','Bearing Wear','2023-04-13',5.2,'P2','Corrective');
INSERT INTO maintenance_history VALUES ('E1050','Overheating','2024-04-29',2.74,'P3','Inspection');
INSERT INTO maintenance_history VALUES ('E1023','Electrical Fault','2024-08-04',6.29,'P2','Corrective');
INSERT INTO maintenance_history VALUES ('E1032','Overheating','2023-07-01',4.53,'P3','Inspection');
INSERT INTO maintenance_history VALUES ('E1016','Seal Failure','2024-07-30',6.36,'P1','Inspection');
INSERT INTO maintenance_history VALUES ('E1048','Electrical Fault','2024-08-05',1.77,'P3','Inspection');
INSERT INTO maintenance_history VALUES ('E1017','Bearing Wear','2023-04-09',9.98,'P3','Inspection');
INSERT INTO maintenance_history VALUES ('E1006','Electrical Fault','2024-01-25',1.42,'P1','Corrective');
INSERT INTO maintenance_history VALUES ('E1016','Leakage','2023-09-01',8.81,'P2','Corrective');
INSERT INTO maintenance_history VALUES ('E1039','Electrical Fault','2023-08-19',5.26,'P2','Inspection');
INSERT INTO maintenance_history VALUES ('E1016','Overheating','2023-04-29',8.08,'P3','Corrective');
INSERT INTO maintenance_history VALUES ('E1003','Overheating','2023-08-27',3.59,'P3','Corrective');
INSERT INTO maintenance_history VALUES ('E1024','Overheating','2023-05-10',5.38,'P2','Inspection');
INSERT INTO maintenance_history VALUES ('E1013','Overheating','2024-07-04',2.9,'P2','Corrective');
INSERT INTO maintenance_history VALUES ('E1049','Bearing Wear','2023-06-03',6.15,'P3','Corrective');
INSERT INTO maintenance_history VALUES ('E1043','Bearing Wear','2023-11-16',4.56,'P2','Corrective');
INSERT INTO maintenance_history VALUES ('E1038','Leakage','2024-07-13',7.34,'P3','Inspection');
INSERT INTO maintenance_history VALUES ('E1050','Bearing Wear','2023-10-05',2.45,'P1','Inspection');
INSERT INTO maintenance_history VALUES ('E1033','Seal Failure','2023-04-11',8.82,'P1','Inspection');
INSERT INTO maintenance_history VALUES ('E1001','Overheating','2023-10-02',1.22,'P1','Corrective');
INSERT INTO maintenance_history VALUES ('E1017','Bearing Wear','2023-05-17',3.38,'P3','Inspection');
INSERT INTO maintenance_history VALUES ('E1009','Bearing Wear','2023-09-07',2.13,'P1','Corrective');
INSERT INTO maintenance_history VALUES ('E1021','Leakage','2023-11-20',4.88,'P2','Inspection');
INSERT INTO maintenance_history VALUES ('E1020','Seal Failure','2024-05-10',3.78,'P2','Corrective');
INSERT INTO maintenance_history VALUES ('E1032','Leakage','2024-06-15',1.42,'P1','Inspection');
INSERT INTO maintenance_history VALUES ('E1014','Leakage','2023-01-13',8.31,'P1','Inspection');
INSERT INTO maintenance_history VALUES ('E1004','Seal Failure','2024-04-26',7.35,'P2','Inspection');
INSERT INTO maintenance_history VALUES ('E1038','Electrical Fault','2024-04-07',1.76,'P2','Inspection');
INSERT INTO maintenance_history VALUES ('E1008','Leakage','2023-08-24',6.68,'P1','Inspection');
INSERT INTO maintenance_history VALUES ('E1039','Leakage','2023-03-29',3.93,'P1','Corrective');
INSERT INTO maintenance_history VALUES ('E1015','Seal Failure','2025-02-10',2.55,'P2','Inspection');
INSERT INTO maintenance_history VALUES ('E1018','Bearing Wear','2024-08-02',1.73,'P1','Inspection');
INSERT INTO maintenance_history VALUES ('E1031','Seal Failure','2024-05-19',7.27,'P3','Corrective');
INSERT INTO maintenance_history VALUES ('E1047','Seal Failure','2023-12-20',8.02,'P3','Inspection');
INSERT INTO maintenance_history VALUES ('E1040','Overheating','2023-08-07',9.09,'P2','Corrective');
INSERT INTO maintenance_history VALUES ('E1031','Leakage','2023-01-14',7.32,'P2','Corrective');
INSERT INTO maintenance_history VALUES ('E1001','Leakage','2024-04-23',9.3,'P3','Corrective');
INSERT INTO maintenance_history VALUES ('E1026','Seal Failure','2024-08-20',8.94,'P3','Corrective');
INSERT INTO maintenance_history VALUES ('E1046','Overheating','2023-08-21',2.18,'P1','Inspection');
INSERT INTO maintenance_history VALUES ('E1014','Seal Failure','2023-12-15',1.28,'P1','Inspection');
INSERT INTO maintenance_history VALUES ('E1042','Bearing Wear','2024-05-31',7.06,'P2','Inspection');
INSERT INTO maintenance_history VALUES ('E1024','Overheating','2023-04-26',3.72,'P1','Corrective');
INSERT INTO maintenance_history VALUES ('E1042','Overheating','2024-01-14',3.95,'P1','Corrective');
INSERT INTO maintenance_history VALUES ('E1012','Overheating','2023-01-21',1.88,'P2','Corrective');
INSERT INTO maintenance_history VALUES ('E1009','Leakage','2023-10-23',5.66,'P1','Inspection');
INSERT INTO maintenance_history VALUES ('E1018','Electrical Fault','2024-01-17',9.43,'P3','Corrective');
INSERT INTO maintenance_history VALUES ('E1006','Electrical Fault','2023-05-05',5.59,'P2','Inspection');
INSERT INTO maintenance_history VALUES ('E1041','Electrical Fault','2023-03-04',1.93,'P1','Corrective');
INSERT INTO maintenance_history VALUES ('E1045','Electrical Fault','2023-08-03',2.27,'P1','Corrective');
INSERT INTO maintenance_history VALUES ('E1002','Leakage','2024-07-05',6.52,'P3','Corrective');
INSERT INTO maintenance_history VALUES ('E1041','Electrical Fault','2023-01-08',1.13,'P3','Inspection');
INSERT INTO maintenance_history VALUES ('E1036','Seal Failure','2023-12-14',4.56,'P3','Inspection');
INSERT INTO maintenance_history VALUES ('E1020','Bearing Wear','2024-07-21',1.02,'P3','Inspection');
INSERT INTO maintenance_history VALUES ('E1016','Leakage','2023-04-12',8.67,'P2','Corrective');
INSERT INTO maintenance_history VALUES ('E1032','Overheating','2023-07-18',2.31,'P2','Corrective');
INSERT INTO maintenance_history VALUES ('E1035','Bearing Wear','2023-05-19',2.09,'P2','Inspection');
INSERT INTO maintenance_history VALUES ('E1049','Leakage','2023-05-29',7.89,'P3','Inspection');
INSERT INTO maintenance_history VALUES ('E1002','Overheating','2024-05-19',1.52,'P3','Corrective');
INSERT INTO maintenance_history VALUES ('E1038','Leakage','2023-09-07',3.91,'P3','Inspection');
INSERT INTO maintenance_history VALUES ('E1015','Seal Failure','2025-01-15',9.9,'P2','Corrective');
INSERT INTO maintenance_history VALUES ('E1033','Bearing Wear','2023-09-18',5.15,'P1','Corrective');
INSERT INTO maintenance_history VALUES ('E1036','Leakage','2023-11-23',9.26,'P1','Corrective');
INSERT INTO maintenance_history VALUES ('E1033','Bearing Wear','2023-01-20',6.22,'P3','Corrective');
INSERT INTO maintenance_history VALUES ('E1004','Seal Failure','2024-01-01',6.25,'P1','Corrective');
INSERT INTO maintenance_history VALUES ('E1043','Seal Failure','2023-09-28',5.9,'P1','Inspection');
INSERT INTO maintenance_history VALUES ('E1029','Seal Failure','2024-01-10',4.21,'P1','Inspection');
INSERT INTO maintenance_history VALUES ('E1036','Overheating','2024-02-24',8.37,'P1','Inspection');
INSERT INTO maintenance_history VALUES ('E1026','Leakage','2024-06-18',5.47,'P2','Corrective');
INSERT INTO maintenance_history VALUES ('E1034','Leakage','2023-04-19',1.03,'P1','Inspection');
INSERT INTO maintenance_history VALUES ('E1034','Seal Failure','2023-02-17',1.02,'P1','Inspection');
INSERT INTO maintenance_history VALUES ('E1026','Bearing Wear','2023-03-10',1.69,'P3','Inspection');
INSERT INTO maintenance_history VALUES ('E1014','Leakage','2023-11-20',8.79,'P1','Inspection');
INSERT INTO maintenance_history VALUES ('E1004','Leakage','2023-04-13',8.58,'P3','Inspection');
INSERT INTO maintenance_history VALUES ('E1007','Bearing Wear','2023-08-09',3.93,'P1','Inspection');
INSERT INTO maintenance_history VALUES ('E1041','Overheating','2023-12-13',4.27,'P2','Inspection');
INSERT INTO maintenance_history VALUES ('E1027','Leakage','2024-08-20',7.17,'P1','Inspection');
INSERT INTO maintenance_history VALUES ('E1026','Bearing Wear','2024-04-06',6.86,'P1','Inspection');
INSERT INTO maintenance_history VALUES ('E1034','Bearing Wear','2024-05-09',8.71,'P2','Inspection');
INSERT INTO maintenance_history VALUES ('E1025','Bearing Wear','2023-03-24',3.67,'P2','Inspection');
INSERT INTO maintenance_history VALUES ('E1027','Overheating','2023-06-27',9.05,'P2','Corrective');
INSERT INTO maintenance_history VALUES ('E1043','Seal Failure','2023-03-16',6.55,'P2','Corrective');
INSERT INTO maintenance_history VALUES ('E1035','Overheating','2024-05-03',9.97,'P1','Inspection');
INSERT INTO maintenance_history VALUES ('E1008','Overheating','2024-03-11',5.16,'P3','Corrective');
INSERT INTO maintenance_history VALUES ('E1012','Seal Failure','2023-08-14',6.24,'P3','Corrective');
INSERT INTO maintenance_history VALUES ('E1021','Bearing Wear','2023-12-19',3.65,'P1','Corrective');
INSERT INTO maintenance_history VALUES ('E1027','Electrical Fault','2023-09-07',9.18,'P3','Corrective');
INSERT INTO maintenance_history VALUES ('E1034','Overheating','2023-08-22',8.56,'P1','Inspection');
INSERT INTO maintenance_history VALUES ('E1004','Overheating','2023-02-04',3.21,'P1','Inspection');
INSERT INTO maintenance_history VALUES ('E1026','Bearing Wear','2024-05-30',5.18,'P3','Corrective');
INSERT INTO maintenance_history VALUES ('E1001','Bearing Wear','2023-11-13',2.63,'P1','Corrective');

-- preventive_maintenance
INSERT INTO preventive_maintenance VALUES ('PM0001','E1038','Bearing Lubrication','2024-09-08',30,'2024-10-08','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0002','E1045','Electrical Inspection','2024-05-17',90,'2024-08-15','Overdue');
INSERT INTO preventive_maintenance VALUES ('PM0003','E1006','Electrical Inspection','2024-05-07',90,'2024-08-05','Scheduled');
INSERT INTO preventive_maintenance VALUES ('PM0004','E1013','Bearing Lubrication','2024-02-05',60,'2024-04-05','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0005','E1017','Electrical Inspection','2024-02-07',90,'2024-05-07','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0006','E1033','Pressure Check','2024-06-17',30,'2024-07-17','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0007','E1042','Electrical Inspection','2024-08-20',90,'2024-11-18','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0008','E1035','Bearing Lubrication','2024-02-19',90,'2024-05-19','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0009','E1010','Bearing Lubrication','2024-01-29',30,'2024-02-28','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0010','E1047','Bearing Lubrication','2024-09-18',30,'2024-10-18','Scheduled');
INSERT INTO preventive_maintenance VALUES ('PM0011','E1002','Bearing Lubrication','2024-03-16',60,'2024-05-15','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0012','E1005','Electrical Inspection','2024-10-27',30,'2024-11-26','Overdue');
INSERT INTO preventive_maintenance VALUES ('PM0013','E1003','Pressure Check','2024-07-30',30,'2024-08-29','Scheduled');
INSERT INTO preventive_maintenance VALUES ('PM0014','E1048','Seal Inspection','2024-08-25',180,'2025-02-21','Overdue');
INSERT INTO preventive_maintenance VALUES ('PM0015','E1022','Electrical Inspection','2024-02-22',30,'2024-03-23','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0016','E1006','Bearing Lubrication','2024-09-22',90,'2024-12-21','Overdue');
INSERT INTO preventive_maintenance VALUES ('PM0017','E1022','Pressure Check','2024-03-27',90,'2024-06-25','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0018','E1026','Electrical Inspection','2024-05-22',180,'2024-11-18','Overdue');
INSERT INTO preventive_maintenance VALUES ('PM0019','E1016','Seal Inspection','2024-09-23',90,'2024-12-22','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0020','E1006','Bearing Lubrication','2024-04-22',180,'2024-10-19','Scheduled');
INSERT INTO preventive_maintenance VALUES ('PM0021','E1017','Electrical Inspection','2024-06-05',60,'2024-08-04','Overdue');
INSERT INTO preventive_maintenance VALUES ('PM0022','E1005','Pressure Check','2024-08-18',30,'2024-09-17','Overdue');
INSERT INTO preventive_maintenance VALUES ('PM0023','E1032','Seal Inspection','2024-03-05',90,'2024-06-03','Scheduled');
INSERT INTO preventive_maintenance VALUES ('PM0024','E1018','Seal Inspection','2024-10-20',90,'2025-01-18','Scheduled');
INSERT INTO preventive_maintenance VALUES ('PM0025','E1043','Seal Inspection','2024-05-30',30,'2024-06-29','Scheduled');
INSERT INTO preventive_maintenance VALUES ('PM0026','E1010','Pressure Check','2024-05-20',30,'2024-06-19','Scheduled');
INSERT INTO preventive_maintenance VALUES ('PM0027','E1034','Bearing Lubrication','2024-04-18',60,'2024-06-17','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0028','E1038','Bearing Lubrication','2024-01-08',180,'2024-07-06','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0029','E1031','Seal Inspection','2024-09-15',60,'2024-11-14','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0030','E1002','Electrical Inspection','2024-09-01',30,'2024-10-01','Scheduled');
INSERT INTO preventive_maintenance VALUES ('PM0031','E1009','Pressure Check','2024-10-25',30,'2024-11-24','Scheduled');
INSERT INTO preventive_maintenance VALUES ('PM0032','E1046','Bearing Lubrication','2024-09-06',90,'2024-12-05','Scheduled');
INSERT INTO preventive_maintenance VALUES ('PM0033','E1029','Bearing Lubrication','2024-07-18',30,'2024-08-17','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0034','E1011','Seal Inspection','2024-04-16',30,'2024-05-16','Scheduled');
INSERT INTO preventive_maintenance VALUES ('PM0035','E1006','Bearing Lubrication','2024-07-19',30,'2024-08-18','Overdue');
INSERT INTO preventive_maintenance VALUES ('PM0036','E1039','Bearing Lubrication','2024-07-30',180,'2025-01-26','Overdue');
INSERT INTO preventive_maintenance VALUES ('PM0037','E1020','Pressure Check','2024-10-19',30,'2024-11-18','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0038','E1020','Electrical Inspection','2024-09-07',180,'2025-03-06','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0039','E1039','Electrical Inspection','2024-06-30',90,'2024-09-28','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0040','E1027','Seal Inspection','2024-04-18',180,'2024-10-15','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0041','E1012','Bearing Lubrication','2024-10-15',90,'2025-01-13','Overdue');
INSERT INTO preventive_maintenance VALUES ('PM0042','E1026','Bearing Lubrication','2024-06-18',90,'2024-09-16','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0043','E1001','Electrical Inspection','2024-05-19',180,'2024-11-15','Scheduled');
INSERT INTO preventive_maintenance VALUES ('PM0044','E1031','Pressure Check','2024-09-21',30,'2024-10-21','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0045','E1015','Seal Inspection','2024-06-25',30,'2024-07-25','Overdue');
INSERT INTO preventive_maintenance VALUES ('PM0046','E1018','Electrical Inspection','2024-05-11',30,'2024-06-10','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0047','E1019','Pressure Check','2024-08-02',30,'2024-09-01','Overdue');
INSERT INTO preventive_maintenance VALUES ('PM0048','E1037','Bearing Lubrication','2024-06-17',60,'2024-08-16','Overdue');
INSERT INTO preventive_maintenance VALUES ('PM0049','E1013','Electrical Inspection','2024-07-10',180,'2025-01-06','Overdue');
INSERT INTO preventive_maintenance VALUES ('PM0050','E1003','Seal Inspection','2024-10-02',180,'2025-03-31','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0051','E1034','Electrical Inspection','2024-01-14',90,'2024-04-13','Overdue');
INSERT INTO preventive_maintenance VALUES ('PM0052','E1026','Seal Inspection','2024-01-18',60,'2024-03-18','Overdue');
INSERT INTO preventive_maintenance VALUES ('PM0053','E1003','Seal Inspection','2024-09-30',30,'2024-10-30','Scheduled');
INSERT INTO preventive_maintenance VALUES ('PM0054','E1019','Pressure Check','2024-10-21',90,'2025-01-19','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0055','E1028','Pressure Check','2024-01-26',90,'2024-04-25','Overdue');
INSERT INTO preventive_maintenance VALUES ('PM0056','E1049','Seal Inspection','2024-05-15',60,'2024-07-14','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0057','E1050','Seal Inspection','2024-03-07',90,'2024-06-05','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0058','E1020','Electrical Inspection','2024-08-08',60,'2024-10-07','Overdue');
INSERT INTO preventive_maintenance VALUES ('PM0059','E1002','Pressure Check','2024-02-19',180,'2024-08-17','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0060','E1029','Pressure Check','2024-02-07',60,'2024-04-07','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0061','E1009','Seal Inspection','2024-05-25',90,'2024-08-23','Scheduled');
INSERT INTO preventive_maintenance VALUES ('PM0062','E1031','Electrical Inspection','2024-09-07',60,'2024-11-06','Scheduled');
INSERT INTO preventive_maintenance VALUES ('PM0063','E1033','Pressure Check','2024-10-20',90,'2025-01-18','Overdue');
INSERT INTO preventive_maintenance VALUES ('PM0064','E1010','Electrical Inspection','2024-09-13',90,'2024-12-12','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0065','E1015','Electrical Inspection','2024-07-16',60,'2024-09-14','Overdue');
INSERT INTO preventive_maintenance VALUES ('PM0066','E1032','Electrical Inspection','2024-08-18',180,'2025-02-14','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0067','E1007','Electrical Inspection','2024-04-02',180,'2024-09-29','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0068','E1024','Pressure Check','2024-02-27',60,'2024-04-27','Scheduled');
INSERT INTO preventive_maintenance VALUES ('PM0069','E1022','Seal Inspection','2024-07-15',60,'2024-09-13','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0070','E1041','Seal Inspection','2024-01-08',180,'2024-07-06','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0071','E1030','Electrical Inspection','2024-01-26',60,'2024-03-26','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0072','E1039','Seal Inspection','2024-02-23',180,'2024-08-21','Overdue');
INSERT INTO preventive_maintenance VALUES ('PM0073','E1025','Pressure Check','2024-05-25',60,'2024-07-24','Scheduled');
INSERT INTO preventive_maintenance VALUES ('PM0074','E1047','Bearing Lubrication','2024-10-20',30,'2024-11-19','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0075','E1044','Seal Inspection','2024-02-24',90,'2024-05-24','Overdue');
INSERT INTO preventive_maintenance VALUES ('PM0076','E1024','Pressure Check','2024-10-06',30,'2024-11-05','Scheduled');
INSERT INTO preventive_maintenance VALUES ('PM0077','E1040','Bearing Lubrication','2024-01-24',180,'2024-07-22','Overdue');
INSERT INTO preventive_maintenance VALUES ('PM0078','E1005','Electrical Inspection','2024-03-30',60,'2024-05-29','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0079','E1020','Seal Inspection','2024-03-11',180,'2024-09-07','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0080','E1039','Bearing Lubrication','2024-02-03',90,'2024-05-03','Scheduled');
INSERT INTO preventive_maintenance VALUES ('PM0081','E1029','Seal Inspection','2024-09-19',60,'2024-11-18','Overdue');
INSERT INTO preventive_maintenance VALUES ('PM0082','E1036','Seal Inspection','2024-03-22',90,'2024-06-20','Overdue');
INSERT INTO preventive_maintenance VALUES ('PM0083','E1029','Electrical Inspection','2024-07-05',90,'2024-10-03','Scheduled');
INSERT INTO preventive_maintenance VALUES ('PM0084','E1040','Bearing Lubrication','2024-04-11',60,'2024-06-10','Scheduled');
INSERT INTO preventive_maintenance VALUES ('PM0085','E1020','Electrical Inspection','2024-01-22',90,'2024-04-21','Overdue');
INSERT INTO preventive_maintenance VALUES ('PM0086','E1006','Pressure Check','2024-09-09',90,'2024-12-08','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0087','E1022','Pressure Check','2024-05-23',90,'2024-08-21','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0088','E1013','Seal Inspection','2024-01-13',30,'2024-02-12','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0089','E1021','Seal Inspection','2024-03-07',180,'2024-09-03','Overdue');
INSERT INTO preventive_maintenance VALUES ('PM0090','E1013','Seal Inspection','2024-05-29',180,'2024-11-25','Scheduled');
INSERT INTO preventive_maintenance VALUES ('PM0091','E1014','Electrical Inspection','2024-06-03',180,'2024-11-30','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0092','E1048','Pressure Check','2024-01-30',60,'2024-03-30','Scheduled');
INSERT INTO preventive_maintenance VALUES ('PM0093','E1044','Bearing Lubrication','2024-01-27',30,'2024-02-26','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0094','E1011','Seal Inspection','2024-10-16',180,'2025-04-14','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0095','E1043','Pressure Check','2024-09-10',180,'2025-03-09','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0096','E1043','Bearing Lubrication','2024-05-24',180,'2024-11-20','Scheduled');
INSERT INTO preventive_maintenance VALUES ('PM0097','E1016','Seal Inspection','2024-08-01',90,'2024-10-30','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0098','E1008','Pressure Check','2024-07-01',90,'2024-09-29','Scheduled');
INSERT INTO preventive_maintenance VALUES ('PM0099','E1044','Seal Inspection','2024-08-12',30,'2024-09-11','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0100','E1025','Electrical Inspection','2024-06-09',60,'2024-08-08','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0101','E1005','Seal Inspection','2024-03-22',90,'2024-06-20','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0102','E1007','Bearing Lubrication','2024-06-24',180,'2024-12-21','Scheduled');
INSERT INTO preventive_maintenance VALUES ('PM0103','E1042','Bearing Lubrication','2024-04-22',60,'2024-06-21','Overdue');
INSERT INTO preventive_maintenance VALUES ('PM0104','E1047','Seal Inspection','2024-06-03',60,'2024-08-02','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0105','E1001','Pressure Check','2024-10-04',90,'2025-01-02','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0106','E1004','Pressure Check','2024-08-11',30,'2024-09-10','Overdue');
INSERT INTO preventive_maintenance VALUES ('PM0107','E1015','Electrical Inspection','2024-08-11',60,'2024-10-10','Overdue');
INSERT INTO preventive_maintenance VALUES ('PM0108','E1044','Pressure Check','2024-06-18',60,'2024-08-17','Scheduled');
INSERT INTO preventive_maintenance VALUES ('PM0109','E1017','Bearing Lubrication','2024-05-27',30,'2024-06-26','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0110','E1012','Bearing Lubrication','2024-01-24',30,'2024-02-23','Scheduled');
INSERT INTO preventive_maintenance VALUES ('PM0111','E1045','Seal Inspection','2024-02-03',30,'2024-03-04','Scheduled');
INSERT INTO preventive_maintenance VALUES ('PM0112','E1016','Bearing Lubrication','2024-10-02',30,'2024-11-01','Overdue');
INSERT INTO preventive_maintenance VALUES ('PM0113','E1047','Electrical Inspection','2024-03-28',180,'2024-09-24','Overdue');
INSERT INTO preventive_maintenance VALUES ('PM0114','E1039','Bearing Lubrication','2024-03-27',60,'2024-05-26','Overdue');
INSERT INTO preventive_maintenance VALUES ('PM0115','E1025','Electrical Inspection','2024-06-24',60,'2024-08-23','Scheduled');
INSERT INTO preventive_maintenance VALUES ('PM0116','E1025','Electrical Inspection','2024-06-01',30,'2024-07-01','Scheduled');
INSERT INTO preventive_maintenance VALUES ('PM0117','E1033','Bearing Lubrication','2024-06-11',30,'2024-07-11','Scheduled');
INSERT INTO preventive_maintenance VALUES ('PM0118','E1003','Bearing Lubrication','2024-06-12',60,'2024-08-11','Completed');
INSERT INTO preventive_maintenance VALUES ('PM0119','E1036','Seal Inspection','2024-08-01',60,'2024-09-30','Scheduled');
INSERT INTO preventive_maintenance VALUES ('PM0120','E1005','Bearing Lubrication','2024-07-15',30,'2024-08-14','Completed');

-- spare_parts
INSERT INTO spare_parts VALUES ('E1001','In Stock',0);
INSERT INTO spare_parts VALUES ('E1002','Low Stock',3);
INSERT INTO spare_parts VALUES ('E1003','Not Available',10);
INSERT INTO spare_parts VALUES ('E1004','In Stock',0);
INSERT INTO spare_parts VALUES ('E1005','Low Stock',4);
INSERT INTO spare_parts VALUES ('E1006','Not Available',0);
INSERT INTO spare_parts VALUES ('E1007','In Stock',12);
INSERT INTO spare_parts VALUES ('E1008','Low Stock',0);
INSERT INTO spare_parts VALUES ('E1009','Not Available',2);
INSERT INTO spare_parts VALUES ('E1010','In Stock',0);
INSERT INTO spare_parts VALUES ('E1011','Low Stock',0);
INSERT INTO spare_parts VALUES ('E1012','Not Available',3);
INSERT INTO spare_parts VALUES ('E1013','In Stock',10);
INSERT INTO spare_parts VALUES ('E1014','Low Stock',0);
INSERT INTO spare_parts VALUES ('E1015','Not Available',4);
INSERT INTO spare_parts VALUES ('E1016','In Stock',0);
INSERT INTO spare_parts VALUES ('E1017','Low Stock',12);
INSERT INTO spare_parts VALUES ('E1018','Not Available',0);
INSERT INTO spare_parts VALUES ('E1019','In Stock',2);
INSERT INTO spare_parts VALUES ('E1020','Low Stock',0);
INSERT INTO spare_parts VALUES ('E1021','Not Available',0);
INSERT INTO spare_parts VALUES ('E1022','In Stock',3);
INSERT INTO spare_parts VALUES ('E1023','Low Stock',10);
INSERT INTO spare_parts VALUES ('E1024','Not Available',0);
INSERT INTO spare_parts VALUES ('E1025','In Stock',4);
INSERT INTO spare_parts VALUES ('E1026','Low Stock',0);
INSERT INTO spare_parts VALUES ('E1027','Not Available',12);
INSERT INTO spare_parts VALUES ('E1028','In Stock',0);
INSERT INTO spare_parts VALUES ('E1029','Low Stock',2);
INSERT INTO spare_parts VALUES ('E1030','Not Available',0);
INSERT INTO spare_parts VALUES ('E1031','In Stock',0);
INSERT INTO spare_parts VALUES ('E1032','Low Stock',3);
INSERT INTO spare_parts VALUES ('E1033','Not Available',10);
INSERT INTO spare_parts VALUES ('E1034','In Stock',0);
INSERT INTO spare_parts VALUES ('E1035','Low Stock',4);
INSERT INTO spare_parts VALUES ('E1036','Not Available',0);
INSERT INTO spare_parts VALUES ('E1037','In Stock',12);
INSERT INTO spare_parts VALUES ('E1038','Low Stock',0);
INSERT INTO spare_parts VALUES ('E1039','Not Available',2);
INSERT INTO spare_parts VALUES ('E1040','In Stock',0);
INSERT INTO spare_parts VALUES ('E1041','Low Stock',0);
INSERT INTO spare_parts VALUES ('E1042','Not Available',3);
INSERT INTO spare_parts VALUES ('E1043','In Stock',10);
INSERT INTO spare_parts VALUES ('E1044','Low Stock',0);
INSERT INTO spare_parts VALUES ('E1045','Not Available',4);
INSERT INTO spare_parts VALUES ('E1046','In Stock',0);
INSERT INTO spare_parts VALUES ('E1047','Low Stock',12);
INSERT INTO spare_parts VALUES ('E1048','Not Available',0);
INSERT INTO spare_parts VALUES ('E1049','In Stock',2);
INSERT INTO spare_parts VALUES ('E1050','Low Stock',0);

-- crew_availability
INSERT INTO crew_availability VALUES ('E1001',true,0);
INSERT INTO crew_availability VALUES ('E1002',true,0);
INSERT INTO crew_availability VALUES ('E1003',false,9);
INSERT INTO crew_availability VALUES ('E1004',true,0);
INSERT INTO crew_availability VALUES ('E1005',true,0);
INSERT INTO crew_availability VALUES ('E1006',false,12);
INSERT INTO crew_availability VALUES ('E1007',true,0);
INSERT INTO crew_availability VALUES ('E1008',true,0);
INSERT INTO crew_availability VALUES ('E1009',false,15);
INSERT INTO crew_availability VALUES ('E1010',true,0);
INSERT INTO crew_availability VALUES ('E1011',true,0);
INSERT INTO crew_availability VALUES ('E1012',false,18);
INSERT INTO crew_availability VALUES ('E1013',true,0);
INSERT INTO crew_availability VALUES ('E1014',true,0);
INSERT INTO crew_availability VALUES ('E1015',false,21);
INSERT INTO crew_availability VALUES ('E1016',true,0);
INSERT INTO crew_availability VALUES ('E1017',true,0);
INSERT INTO crew_availability VALUES ('E1018',false,9);
INSERT INTO crew_availability VALUES ('E1019',true,0);
INSERT INTO crew_availability VALUES ('E1020',true,0);
INSERT INTO crew_availability VALUES ('E1021',false,12);
INSERT INTO crew_availability VALUES ('E1022',true,0);
INSERT INTO crew_availability VALUES ('E1023',true,0);
INSERT INTO crew_availability VALUES ('E1024',false,15);
INSERT INTO crew_availability VALUES ('E1025',true,0);
INSERT INTO crew_availability VALUES ('E1026',true,0);
INSERT INTO crew_availability VALUES ('E1027',false,18);
INSERT INTO crew_availability VALUES ('E1028',true,0);
INSERT INTO crew_availability VALUES ('E1029',true,0);
INSERT INTO crew_availability VALUES ('E1030',false,21);
INSERT INTO crew_availability VALUES ('E1031',true,0);
INSERT INTO crew_availability VALUES ('E1032',true,0);
INSERT INTO crew_availability VALUES ('E1033',false,9);
INSERT INTO crew_availability VALUES ('E1034',true,0);
INSERT INTO crew_availability VALUES ('E1035',true,0);
INSERT INTO crew_availability VALUES ('E1036',false,12);
INSERT INTO crew_availability VALUES ('E1037',true,0);
INSERT INTO crew_availability VALUES ('E1038',true,0);
INSERT INTO crew_availability VALUES ('E1039',false,15);
INSERT INTO crew_availability VALUES ('E1040',true,0);
INSERT INTO crew_availability VALUES ('E1041',true,0);
INSERT INTO crew_availability VALUES ('E1042',false,18);
INSERT INTO crew_availability VALUES ('E1043',true,0);
INSERT INTO crew_availability VALUES ('E1044',true,0);
INSERT INTO crew_availability VALUES ('E1045',false,21);
INSERT INTO crew_availability VALUES ('E1046',true,0);
INSERT INTO crew_availability VALUES ('E1047',true,0);
INSERT INTO crew_availability VALUES ('E1048',false,9);
INSERT INTO crew_availability VALUES ('E1049',true,0);
INSERT INTO crew_availability VALUES ('E1050',true,0);

-- technician_tools
INSERT INTO technician_tools VALUES ('E1001',false,false);
INSERT INTO technician_tools VALUES ('E1002',true,true);
INSERT INTO technician_tools VALUES ('E1003',true,true);
INSERT INTO technician_tools VALUES ('E1004',true,true);
INSERT INTO technician_tools VALUES ('E1005',true,true);
INSERT INTO technician_tools VALUES ('E1006',false,true);
INSERT INTO technician_tools VALUES ('E1007',true,true);
INSERT INTO technician_tools VALUES ('E1008',true,false);
INSERT INTO technician_tools VALUES ('E1009',true,true);
INSERT INTO technician_tools VALUES ('E1010',true,true);
INSERT INTO technician_tools VALUES ('E1011',false,true);
INSERT INTO technician_tools VALUES ('E1012',true,true);
INSERT INTO technician_tools VALUES ('E1013',true,true);
INSERT INTO technician_tools VALUES ('E1014',true,true);
INSERT INTO technician_tools VALUES ('E1015',true,false);
INSERT INTO technician_tools VALUES ('E1016',false,true);
INSERT INTO technician_tools VALUES ('E1017',true,true);
INSERT INTO technician_tools VALUES ('E1018',true,true);
INSERT INTO technician_tools VALUES ('E1019',true,true);
INSERT INTO technician_tools VALUES ('E1020',true,true);
INSERT INTO technician_tools VALUES ('E1021',false,true);
INSERT INTO technician_tools VALUES ('E1022',true,false);
INSERT INTO technician_tools VALUES ('E1023',true,true);
INSERT INTO technician_tools VALUES ('E1024',true,true);
INSERT INTO technician_tools VALUES ('E1025',true,true);
INSERT INTO technician_tools VALUES ('E1026',false,true);
INSERT INTO technician_tools VALUES ('E1027',true,true);
INSERT INTO technician_tools VALUES ('E1028',true,true);
INSERT INTO technician_tools VALUES ('E1029',true,false);
INSERT INTO technician_tools VALUES ('E1030',true,true);
INSERT INTO technician_tools VALUES ('E1031',false,true);
INSERT INTO technician_tools VALUES ('E1032',true,true);
INSERT INTO technician_tools VALUES ('E1033',true,true);
INSERT INTO technician_tools VALUES ('E1034',true,true);
INSERT INTO technician_tools VALUES ('E1035',true,true);
INSERT INTO technician_tools VALUES ('E1036',false,false);
INSERT INTO technician_tools VALUES ('E1037',true,true);
INSERT INTO technician_tools VALUES ('E1038',true,true);
INSERT INTO technician_tools VALUES ('E1039',true,true);
INSERT INTO technician_tools VALUES ('E1040',true,true);
INSERT INTO technician_tools VALUES ('E1041',false,true);
INSERT INTO technician_tools VALUES ('E1042',true,true);
INSERT INTO technician_tools VALUES ('E1043',true,false);
INSERT INTO technician_tools VALUES ('E1044',true,true);
INSERT INTO technician_tools VALUES ('E1045',true,true);
INSERT INTO technician_tools VALUES ('E1046',false,true);
INSERT INTO technician_tools VALUES ('E1047',true,true);
INSERT INTO technician_tools VALUES ('E1048',true,true);
INSERT INTO technician_tools VALUES ('E1049',true,true);
INSERT INTO technician_tools VALUES ('E1050',true,false);