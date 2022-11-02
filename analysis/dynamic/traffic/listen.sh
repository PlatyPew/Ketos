#!/bin/sh

containerid=$1
iplink=$2
containeriface=$3

iface=$(ip link | grep "${iplink}:" | cut -d " " -f 2 | cut -d "@" -f 1)

tcpdump -i $iface -w /opt/sniffer/captures/${containerid}-${containeriface}.pcap
