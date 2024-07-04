import xml.etree.ElementTree as ET


def parse_xml(path) -> dict:
    tree = ET.parse(path)
    root = tree.getroot()

    data = {"color": "", "dimensions": {}, "laser_lines": {}, "detectors": {},
            "confocal_settings": {}}

    for channel_description in root.findall(".//ChannelDescription"):
        data["color"] = channel_description.attrib.get("LUTName")

    for dim_desc in root.findall(".//DimensionDescription"):
        dim_id = dim_desc.attrib.get("DimID")
        if dim_id in ["X", "Y", "Z"]:
            data["dimensions"][dim_id] = {
                "logical_size": int(dim_desc.attrib.get("NumberOfElements")),
                "voxel_size": float(dim_desc.attrib.get("Voxel"))
            }
    for i, laser_line in enumerate(root.findall(".//LaserLineSetting")):
        laser_intensity = float(laser_line.attrib.get("IntensityDev"))
        if laser_intensity != 0:
            laser_length = int(laser_line.attrib.get("LaserLine"))
            data["laser_lines"][f"laser {i + 1}"] = {
                "length": laser_length,
                "intensity": laser_intensity}

    for detector in root.findall(".//Detector"):
        detector_name = detector.attrib.get("Name")
        if bool(int(detector.attrib.get("IsActive"))):
            data["detectors"][detector_name] = {
                "channel_name": detector.attrib.get("ChannelName"),
                "band": detector.attrib.get("Band"),
                "gain": int(detector.attrib.get("Gain"))
            }

    for confocal_setting in root.findall(".//ATLConfocalSettingDefinition"):
        data["confocal_settings"] = {
            "scan_speed": int(confocal_setting.attrib.get("ScanSpeed").split()[0]),
            "magnification": int(confocal_setting.attrib.get(
                "Magnification")),
            "zoom": float(confocal_setting.attrib.get("Zoom")),
            "pinhole": float(confocal_setting.attrib.get("Pinhole").split()[0]),
            "pinhole_airy": float(confocal_setting.attrib.get("PinholeAiry").split()[0])}

    return data
